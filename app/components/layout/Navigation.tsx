'use client';

import { useState, useEffect } from 'react';
import { weddingConfig } from '@/app/config/wedding.config';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#location', label: 'Location' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#rsvp', label: 'RSVP' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-sm shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="text-xl md:text-2xl font-serif text-charcoal hover:text-terracotta transition-colors"
          >
            {weddingConfig.couple.partner1} & {weddingConfig.couple.partner2}
          </a>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm uppercase tracking-wider font-sans text-charcoal hover:text-terracotta transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <a
              href="#rsvp"
              onClick={(e) => scrollToSection(e, '#rsvp')}
              className="text-sm uppercase tracking-wider font-sans text-terracotta"
            >
              RSVP
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
