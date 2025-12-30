# Wedding Website - Dokploy Deployment Guide

Complete guide for deploying the Next.js wedding website with PostgreSQL database to Dokploy.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Local Testing with Docker](#local-testing-with-docker)
- [Dokploy Deployment](#dokploy-deployment)
- [Database Management](#database-management)
- [Domain Configuration](#domain-configuration)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)

---

## Prerequisites

Before deploying, ensure you have:

1. **Dokploy Instance**: Running Dokploy server with access to the dashboard
2. **Git Repository**: Code pushed to GitHub, GitLab, or similar
3. **Domain Name** (optional): Custom domain for the wedding website
4. **Local Tools** (for testing):
   - Docker & Docker Compose
   - Node.js 20+
   - npm or pnpm

---

## Local Development Setup

### 1. Install Dependencies

```bash
cd wedding-site
npm install
```

This will install all dependencies and automatically run `prisma generate` via the postinstall script.

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your local database configuration:

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://wedding_user:wedding_password@localhost:5432/wedding_db
```

### 3. Start Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create database
createdb wedding_db

# Or use the Docker Compose setup (see next section)
```

### 4. Run Database Migrations

```bash
# Push schema to database (development)
npm run db:push

# Or run migrations (production-like)
npm run db:migrate
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

---

## Local Testing with Docker

Test the complete production setup locally before deploying to Dokploy.

### 1. Start All Services

```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f wedding-site
```

This starts three services:
- **wedding-site**: Next.js app on `http://localhost:3000`
- **postgres**: PostgreSQL database on port 5432
- **postgres-admin**: pgAdmin on `http://localhost:5050`

### 2. Run Database Migrations

```bash
# Execute migrations inside the container
docker-compose exec wedding-site npm run db:push
```

### 3. Access Services

- **Website**: http://localhost:3000
- **pgAdmin**: http://localhost:5050
  - Email: `admin@wedding.local`
  - Password: `admin`

### 4. Configure pgAdmin Connection

In pgAdmin, add a new server:
- **Name**: Wedding DB
- **Host**: `postgres` (container name)
- **Port**: 5432
- **Database**: wedding_db
- **Username**: wedding_user
- **Password**: wedding_password

### 5. Test RSVP Submission

1. Navigate to `http://localhost:3000#rsvp`
2. Fill out the RSVP form
3. Submit the form
4. Check pgAdmin to verify the data was saved
5. Or view in terminal:

```bash
docker-compose exec postgres psql -U wedding_user -d wedding_db -c "SELECT * FROM \"Rsvp\";"
```

### 6. Stop Services

```bash
# Stop containers
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

---

## Dokploy Deployment

### Step 1: Create PostgreSQL Database

1. **Login to Dokploy Dashboard**
2. **Create New Database**:
   - Type: PostgreSQL
   - Name: `wedding-postgres`
   - Version: 16 (or latest)
   - Username: `wedding_user`
   - Password: Generate a secure password
   - Database: `wedding_db`
   - Port: 5432 (internal)

3. **Save Database Credentials**:
   ```
   Host: wedding-postgres (internal service name)
   Port: 5432
   Database: wedding_db
   Username: wedding_user
   Password: [generated-password]
   ```

4. **Note the Connection String**:
   ```
   postgresql://wedding_user:[password]@wedding-postgres:5432/wedding_db
   ```

### Step 2: Create Next.js Application

1. **Create New Application** in Dokploy
2. **Select Docker Build Type**
3. **Configure Repository**:
   - Repository URL: `https://github.com/yourusername/wedding-website.git`
   - Branch: `main`
   - Build Context: `./wedding-site`
   - Dockerfile Path: `./wedding-site/Dockerfile`

### Step 3: Configure Environment Variables

Add these environment variables in Dokploy:

```bash
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_TELEMETRY_DISABLED=1
DATABASE_URL=postgresql://wedding_user:[password]@wedding-postgres:5432/wedding_db
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Important**: Replace `[password]` with your actual database password and `your-domain.com` with your domain.

### Step 4: Configure Build Settings

- **Port**: 3000
- **Health Check Path**: `/`
- **Restart Policy**: Always
- **Resource Limits**:
  - Memory: 1GB
  - CPU: 1 core

### Step 5: Deploy Application

1. Click **Deploy** button
2. Monitor build logs for any errors
3. Wait for build to complete (~3-5 minutes)
4. Check deployment status

### Step 6: Run Database Migrations

Once the application is deployed, run migrations:

**Option 1: Via Dokploy Shell**
1. Open application in Dokploy
2. Click **Shell** or **Terminal**
3. Run:
   ```bash
   npm run db:push
   ```

**Option 2: Via Dokploy CLI** (if installed)
```bash
dokploy exec wedding-site npm run db:push
```

### Step 7: Verify Deployment

1. Visit your application URL (Dokploy-provided or custom domain)
2. Test the RSVP form
3. Check database for the entry

---

## Database Management

### View RSVPs

**Option 1: Prisma Studio** (Deploy as separate service or run locally)
```bash
# Run locally connected to production DB
DATABASE_URL="postgresql://..." npx prisma studio
```

**Option 2: pgAdmin** (Deploy alongside your app)

Add pgAdmin service to Dokploy:
- Image: `dpage/pgadmin4:latest`
- Port: 80 → 5050
- Environment:
  - `PGADMIN_DEFAULT_EMAIL=admin@yourdomain.com`
  - `PGADMIN_DEFAULT_PASSWORD=[secure-password]`

**Option 3: SQL Query via Dokploy Shell**
```bash
# Connect to database container
psql -U wedding_user -d wedding_db

# List all RSVPs
SELECT * FROM "Rsvp" ORDER BY "createdAt" DESC;

# Count attendees
SELECT attendance, COUNT(*), SUM("guestCount")
FROM "Rsvp"
GROUP BY attendance;
```

### Export RSVPs

**Export to CSV:**
```bash
# Via Dokploy shell in postgres container
psql -U wedding_user -d wedding_db -c "\COPY (SELECT * FROM \"Rsvp\" ORDER BY \"createdAt\" DESC) TO STDOUT CSV HEADER" > rsvps.csv
```

**Export to JSON:**
```bash
# Via API endpoint
curl https://your-domain.com/api/rsvp > rsvps.json
```

### Backup Database

**Manual Backup:**
```bash
# Create backup
pg_dump -h wedding-postgres -U wedding_user wedding_db > backup-$(date +%Y%m%d).sql

# Restore backup
psql -h wedding-postgres -U wedding_user wedding_db < backup-20250101.sql
```

**Automated Backups:**

Configure in Dokploy or set up a cron job:
```bash
0 2 * * * pg_dump -h wedding-postgres -U wedding_user wedding_db | gzip > /backups/wedding-$(date +\%Y\%m\%d).sql.gz
```

---

## Domain Configuration

### Step 1: Add Domain in Dokploy

1. Go to your application in Dokploy
2. Navigate to **Domains** section
3. Click **Add Domain**
4. Enter your domain: `sarahandjames.wedding`
5. Enable **HTTPS** (Let's Encrypt)
6. Save configuration

### Step 2: Configure DNS Records

Add these records with your domain registrar:

**A Record:**
```
Type: A
Name: @
Value: [Dokploy-server-IP]
TTL: 3600
```

**CNAME Record (optional, for www):**
```
Type: CNAME
Name: www
Value: sarahandjames.wedding
TTL: 3600
```

### Step 3: Wait for DNS Propagation

- DNS changes can take 1-48 hours
- Check status: `dig sarahandjames.wedding`
- Or use: https://dnschecker.org

### Step 4: Enable SSL Certificate

Dokploy will automatically provision an SSL certificate via Let's Encrypt once DNS is configured.

Verify HTTPS:
```bash
curl -I https://sarahandjames.wedding
```

---

## Troubleshooting

### Build Fails

**Problem**: Docker build fails during deployment

**Solutions**:
1. Check build logs in Dokploy for specific errors
2. Verify Dockerfile syntax
3. Ensure all dependencies in package.json
4. Test build locally: `docker build -t wedding-site .`

### Database Connection Error

**Problem**: Application can't connect to database

**Solutions**:
1. Verify `DATABASE_URL` environment variable is correct
2. Check database service is running in Dokploy
3. Ensure database and app are on the same network
4. Test connection:
   ```bash
   psql $DATABASE_URL -c "SELECT 1;"
   ```

### RSVP Form Not Saving

**Problem**: Form submits but data doesn't save

**Solutions**:
1. Check application logs for errors
2. Verify database migrations ran: `npm run db:push`
3. Check database permissions
4. Test API endpoint directly:
   ```bash
   curl -X POST https://your-domain.com/api/rsvp \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","attendance":"attending","guestCount":1}'
   ```

### Container Keeps Restarting

**Problem**: Application container continuously restarts

**Solutions**:
1. Check health check configuration
2. Increase `start_period` in health check
3. View container logs: `docker logs [container-id]`
4. Verify `PORT` and `HOSTNAME` environment variables
5. Check resource limits (memory/CPU)

### Image Too Large

**Problem**: Docker image size is excessive

**Solutions**:
1. Verify `.dockerignore` is working
2. Check that multi-stage build is used
3. Ensure standalone output mode enabled in next.config.ts
4. Clean up unused dependencies

### SSL Certificate Issues

**Problem**: HTTPS not working or certificate errors

**Solutions**:
1. Verify DNS records point to correct IP
2. Wait for DNS propagation (up to 48 hours)
3. Check Dokploy logs for Let's Encrypt errors
4. Ensure port 80 and 443 are accessible
5. Retry certificate generation in Dokploy

---

## Maintenance

### Update Application

**Push updates to repository:**
```bash
git add .
git commit -m "Update wedding website"
git push origin main
```

**Redeploy in Dokploy:**
1. Navigate to application
2. Click **Redeploy** or configure auto-deploy webhook
3. Monitor build logs
4. Verify deployment

### Monitor Application

**Check application status:**
- Dokploy dashboard shows service health
- Monitor resource usage (CPU, memory, disk)
- Set up alerts for downtime

**View logs:**
```bash
# Via Dokploy UI
- Navigate to application
- Click "Logs" tab

# Via CLI
dokploy logs wedding-site --follow
```

### Scale Application

If traffic increases:

1. **Vertical Scaling**: Increase resource limits in Dokploy
2. **Horizontal Scaling**: Add more container replicas
3. **Database Scaling**: Upgrade PostgreSQL instance

### Security Updates

**Regular maintenance:**
1. Update dependencies: `npm update`
2. Check for vulnerabilities: `npm audit`
3. Update base Docker images
4. Review and rotate database credentials
5. Monitor security advisories

### Post-Wedding

**After the wedding:**
1. Export all RSVPs for records
2. Backup database
3. Consider archiving the website
4. Or repurpose as a photo gallery/thank you page

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Docker Documentation](https://docs.docker.com)
- [Dokploy Documentation](https://dokploy.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## Support

For issues or questions:
1. Check logs in Dokploy dashboard
2. Review troubleshooting section above
3. Test locally with docker-compose
4. Check database connectivity
5. Verify environment variables

---

**Deployment Checklist:**

- [ ] Local testing passes
- [ ] Docker build succeeds locally
- [ ] Database created in Dokploy
- [ ] Environment variables configured
- [ ] Application deployed successfully
- [ ] Database migrations completed
- [ ] RSVP form tested and working
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Backups configured
- [ ] Monitoring set up

**Congratulations! Your wedding website is now live!** 🎉
