// Wedding Configuration
// Centralized data for the wedding website - update these values for your wedding

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Venue {
  name: string;
  type: 'ceremony' | 'reception' | 'both';
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  mapUrl: string;
  directions?: string;
}

export interface WeddingConfig {
  couple: {
    partner1: string;
    partner2: string;
    fullNames?: string;
  };
  wedding: {
    date: string; // ISO 8601 format for countdown timer
    displayDate: string;
    displayTime: string;
    location: string;
  };
  timeline: TimelineEvent[];
  venues: Venue[];
  rsvp: {
    deadline: string;
    email: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    partner1: 'Sarah',
    partner2: 'James',
    fullNames: 'Sarah Martinez & James Chen',
  },

  wedding: {
    date: '2025-06-15T16:00:00', // June 15, 2025 at 4:00 PM
    displayDate: 'June 15, 2025',
    displayTime: '4:00 PM',
    location: 'Riverside Gardens, Napa Valley',
  },

  timeline: [
    {
      time: '3:30 PM',
      title: 'Guest Arrival',
      description: 'Welcome drinks and light refreshments',
      icon: '🥂',
    },
    {
      time: '4:00 PM',
      title: 'Ceremony Begins',
      description: 'Please be seated by 3:55 PM',
      icon: '💒',
    },
    {
      time: '4:30 PM',
      title: 'Cocktail Hour',
      description: 'Celebrate with drinks and hors d\'oeuvres',
      icon: '🍸',
    },
    {
      time: '5:30 PM',
      title: 'Reception Begins',
      description: 'Dinner, toasts, and dancing',
      icon: '🎉',
    },
    {
      time: '7:00 PM',
      title: 'First Dance',
      description: 'Join us on the dance floor',
      icon: '💃',
    },
    {
      time: '10:00 PM',
      title: 'Last Call',
      description: 'Thank you for celebrating with us',
      icon: '🌙',
    },
  ],

  venues: [
    {
      name: 'Riverside Gardens',
      type: 'both',
      address: '123 Vineyard Lane, Napa Valley, CA 94558',
      coordinates: {
        lat: 38.2975,
        lng: -122.2869,
      },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.18174806593!2d-122.41941485!3d38.297505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80842389d9f1b2ab%3A0x3f2b3c51a6c3f0f8!2sNapa%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890',
      directions: 'Free parking available on-site. Shuttle service from downtown Napa.',
    },
  ],

  rsvp: {
    deadline: 'May 15, 2025',
    email: 'rsvp@sarahandjames.wedding',
  },

  contact: {
    email: 'hello@sarahandjames.wedding',
    phone: '+1 (555) 123-4567',
  },
};
