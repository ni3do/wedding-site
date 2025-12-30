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
    partner1: 'Simon',
    partner2: 'Carmen',
    fullNames: 'Simon & Carmen',
  },

  wedding: {
    date: '2026-04-23T14:00:00', // April 23, 2026 at 2:00 PM
    displayDate: 'April 23, 2026',
    displayTime: '2:00 PM',
    location: 'Zivilstandesamt Dielsdorf',
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
      name: 'Zivilstandesamt Dielsdorf',
      type: 'both',
      address: 'Mühlestrasse 4, 8157 Dielsdorf',
      coordinates: {
        lat: 47.4817,
        lng: 8.4569,
      },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2698.5!2d8.4569!3d47.4817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDI4JzU0LjEiTiA4wrAyNycyNC44IkU!5e0!3m2!1sen!2sch!4v1234567890',
      directions: 'Public parking available nearby. The registry office is located in the center of Dielsdorf.',
    },
  ],

  rsvp: {
    deadline: 'April 1, 2026',
    email: 'rsvp@wedding.siwachter.com',
  },

  contact: {
    email: 'hello@wedding.siwachter.com',
    phone: '+1 (555) 123-4567',
  },
};
