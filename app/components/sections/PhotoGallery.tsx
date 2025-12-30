import Image from 'next/image';
import Container from '@/app/components/layout/Container';
import SectionTitle from '@/app/components/layout/SectionTitle';
import ScrollAnimationWrapper from '@/app/components/ui/ScrollAnimationWrapper';

const galleryImages = [
  { src: '/images/gallery/1.jpg', alt: 'Couple photo 1' },
  { src: '/images/gallery/2.jpg', alt: 'Couple photo 2' },
  { src: '/images/gallery/3.jpg', alt: 'Couple photo 3' },
  { src: '/images/gallery/4.jpg', alt: 'Couple photo 4' },
  { src: '/images/gallery/5.jpg', alt: 'Couple photo 5' },
  { src: '/images/gallery/6.jpg', alt: 'Couple photo 6' },
];

export default function PhotoGallery() {
  return (
    <section className="py-16 md:py-24 bg-white" id="gallery">
      <Container>
        <SectionTitle
          title="Our Journey"
          subtitle="A glimpse of our love story"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <ScrollAnimationWrapper key={index} delay={index * 100}>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-dark-cream group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
