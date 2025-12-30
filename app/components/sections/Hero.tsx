'use client';

import { weddingConfig } from '@/app/config/wedding.config';
import CountdownTimer from '@/app/components/ui/CountdownTimer';
import Container from '@/app/components/layout/Container';

export default function Hero() {
  const { couple, wedding } = weddingConfig;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-cream to-dark-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-sage/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-terracotta/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <Container className="relative z-10">
        <div className="text-center space-y-8">
          {/* Couple Names */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl font-sans text-sage uppercase tracking-widest">
              Join us in celebrating
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-charcoal">
              {couple.partner1}
              <span className="text-terracotta mx-4">&</span>
              {couple.partner2}
            </h1>
          </div>

          {/* Wedding Date */}
          <div className="space-y-2">
            <p className="text-2xl md:text-3xl font-serif text-charcoal/80">
              {wedding.displayDate}
            </p>
            <p className="text-lg md:text-xl font-sans text-charcoal/60">
              {wedding.displayTime} • {wedding.location}
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="max-w-4xl mx-auto pt-8">
            <CountdownTimer targetDate={wedding.date} />
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12">
            <a
              href="#timeline"
              className="inline-block text-charcoal/50 hover:text-terracotta transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg
                className="w-6 h-6 animate-bounce mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              <span className="text-sm uppercase tracking-wider font-sans block mt-2">
                Scroll
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
