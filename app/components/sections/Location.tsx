'use client';

import { weddingConfig } from '@/app/config/wedding.config';
import Container from '@/app/components/layout/Container';
import SectionTitle from '@/app/components/layout/SectionTitle';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import ScrollAnimationWrapper from '@/app/components/ui/ScrollAnimationWrapper';

export default function Location() {
  const { venues } = weddingConfig;

  return (
    <section className="py-16 md:py-24 bg-terracotta/10" id="location">
      <Container>
        <SectionTitle
          title="Location & Directions"
          subtitle="How to find us on our special day"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {venues.map((venue, index) => (
            <ScrollAnimationWrapper key={index} delay={index * 200}>
              <Card className="h-full flex flex-col">
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-terracotta/20 text-terracotta text-sm font-sans uppercase tracking-wider rounded-full mb-3">
                      {venue.type === 'ceremony'
                        ? 'Ceremony'
                        : venue.type === 'reception'
                        ? 'Reception'
                        : 'Ceremony & Reception'}
                    </span>
                    <h3 className="text-3xl font-serif text-charcoal mb-2">
                      {venue.name}
                    </h3>
                    <p className="text-charcoal/70 font-sans">{venue.address}</p>
                  </div>

                  {venue.directions && (
                    <p className="text-sm text-charcoal/60 font-sans mb-4">
                      {venue.directions}
                    </p>
                  )}

                  {/* Map */}
                  <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
                    <iframe
                      src={venue.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    const query = encodeURIComponent(venue.address);
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${query}`,
                      '_blank'
                    );
                  }}
                  className="w-full"
                >
                  Get Directions
                </Button>
              </Card>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
