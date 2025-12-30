# Beautiful Wedding Website

A stunning, fully responsive wedding website built with Next.js 16, React 19, and Tailwind CSS v4.

## 🎉 Live Development Server

The site is now running at: **http://localhost:3001**

## ✨ Features

- **Hero Section** with live countdown timer to the wedding day
- **Event Timeline** with ceremony schedule
- **Location Section** with embedded Google Maps
- **Photo Gallery** with smooth animations
- **RSVP Form** with validation
- **Smooth Scroll Navigation** with sticky header
- **Fully Responsive** design for all devices
- **Elegant Typography** using Playfair Display and Montserrat fonts
- **Beautiful Color Palette**: Cream, Terracotta, Sage, and Gold

## 🔧 Customizing Your Wedding Website

### 1. Update Wedding Details

Edit `/app/config/wedding.config.ts` to customize ALL wedding information:

```typescript
export const weddingConfig = {
  // Change couple names
  couple: {
    partner1: 'Your Name',
    partner2: 'Partner Name',
  },

  // Update wedding date and location
  wedding: {
    date: '2025-06-15T16:00:00', // ISO format for countdown
    displayDate: 'June 15, 2025',
    displayTime: '4:00 PM',
    location: 'Your Venue Name',
  },

  // Customize timeline events
  timeline: [
    { time: '3:30 PM', title: 'Event Name', description: '...', icon: '🥂' },
    // Add more events...
  ],

  // Update venue information
  venues: [
    {
      name: 'Venue Name',
      address: 'Full Address',
      mapUrl: 'Your Google Maps Embed URL',
      // ...
    },
  ],

  // Update contact info
  rsvp: { deadline: 'May 15, 2025', email: 'rsvp@yoursite.com' },
  contact: { email: 'hello@yoursite.com' },
};
```

### 2. Add Your Photos

Replace the placeholder images in `/public/images/gallery/`:

- Delete the existing SVG placeholder files (1.jpg - 6.jpg)
- Add your own wedding photos (JPG, PNG, or WebP format)
- Photos will be automatically optimized by Next.js

The gallery accepts any number of images - just update the array in:
`/app/components/sections/PhotoGallery.tsx`

### 3. Update Google Maps

To get your map embed URL:

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your venue
3. Click "Share" → "Embed a map"
4. Copy the iframe src URL
5. Paste into `venues.mapUrl` in the config file

### 4. Customize Colors (Optional)

Colors are defined in `/app/globals.css`:

```css
:root {
  --cream: #FBF7F4;
  --terracotta: #C17767;
  --sage: #8B9A7F;
  --gold: #D4AF37;
  --charcoal: #2C2C2C;
}
```

### 5. Update SEO Metadata

Edit `/app/layout.tsx` to change the page title and description:

```typescript
export const metadata: Metadata = {
  title: "Your Names - Wedding Date",
  description: "Your wedding description",
};
```

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📱 Responsive Design

The website is optimized for:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎨 Component Structure

```
app/
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── CountdownTimer.tsx
│   │   └── ScrollAnimationWrapper.tsx
│   ├── layout/           # Layout components
│   │   ├── Container.tsx
│   │   ├── SectionTitle.tsx
│   │   └── Navigation.tsx
│   └── sections/         # Page sections
│       ├── Hero.tsx
│       ├── EventTimeline.tsx
│       ├── Location.tsx
│       ├── PhotoGallery.tsx
│       └── RSVPForm.tsx
├── config/
│   └── wedding.config.ts # ⭐ Main configuration file
├── lib/
│   └── utils.ts          # Utility functions
└── page.tsx              # Main page composition
```

## 🔮 Future Enhancements

To add RSVP backend functionality:

1. Create an API route: `/app/api/rsvp/route.ts`
2. Connect to a database (Supabase, Firebase, etc.)
3. Update the form submission in `RSVPForm.tsx`

## 📝 Notes

- **All configuration is in variables** - no hardcoded text in components
- The countdown timer updates every second
- Smooth scroll animations trigger when elements come into view
- Navigation becomes sticky after scrolling 50px
- RSVP form currently logs to console (add backend as needed)

## 🎯 Quick Start Checklist

- [ ] Update couple names in `wedding.config.ts`
- [ ] Set wedding date and time
- [ ] Add venue details and map URL
- [ ] Customize timeline events
- [ ] Replace gallery placeholder images
- [ ] Update RSVP deadline and email
- [ ] Customize page metadata in `layout.tsx`
- [ ] Test on mobile devices
- [ ] Deploy to Vercel or your hosting platform

## 🚢 Deployment

Deploy easily to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.

---

Enjoy your beautiful wedding website! 💍✨
