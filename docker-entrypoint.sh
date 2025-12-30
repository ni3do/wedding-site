#!/bin/sh
set -e

echo "Starting application..."

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

echo "Migrations completed successfully!"

# Start the application
echo "Starting Next.js server..."
exec node server.js
