import { weddingConfig } from '@/app/config/wedding.config';
import Container from '@/app/components/layout/Container';
import SectionTitle from '@/app/components/layout/SectionTitle';
import Card from '@/app/components/ui/Card';
import ScrollAnimationWrapper from '@/app/components/ui/ScrollAnimationWrapper';

export default function EventTimeline() {
  const { timeline } = weddingConfig;

  return (
    <section className="py-16 md:py-24 bg-white" id="timeline">
      <Container>
        <SectionTitle
          title="Our Special Day"
          subtitle="Join us for an unforgettable celebration"
        />

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <ScrollAnimationWrapper key={index} delay={index * 100}>
                <div className="relative pl-8 md:pl-16">
                  {/* Timeline line */}
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-3 md:left-7 top-12 bottom-0 w-0.5 bg-terracotta/30"></div>
                  )}

                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-4 top-4 w-6 h-6 rounded-full bg-terracotta border-4 border-cream shadow-md"></div>

                  <Card>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Icon */}
                      <div className="text-4xl">{event.icon}</div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                          <h3 className="text-2xl font-serif text-charcoal">
                            {event.title}
                          </h3>
                          <span className="text-lg font-sans text-terracotta">
                            {event.time}
                          </span>
                        </div>
                        <p className="mt-2 text-charcoal/70 font-sans">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
