import Navigation from '@/app/components/layout/Navigation';
import Hero from '@/app/components/sections/Hero';
import EventTimeline from '@/app/components/sections/EventTimeline';
import Location from '@/app/components/sections/Location';
import PhotoGallery from '@/app/components/sections/PhotoGallery';
import RSVPForm from '@/app/components/sections/RSVPForm';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="scroll-smooth">
        <section id="hero">
          <Hero />
        </section>

        <section id="timeline">
          <EventTimeline />
        </section>

        <section id="location">
          <Location />
        </section>

        <section id="gallery">
          <PhotoGallery />
        </section>

        <section id="rsvp">
          <RSVPForm />
        </section>

        {/* Footer */}
        <footer className="bg-charcoal text-cream py-8">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
            <p className="font-sans text-sm">
              Made with love for our special day
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
