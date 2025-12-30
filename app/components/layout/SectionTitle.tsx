import { cn } from '@/app/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn(centered ? 'text-center' : '', 'mb-12', className)}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal mb-4">
        {title}
      </h2>
      {centered && (
        <div className="w-24 h-1 bg-gold mx-auto mb-4"></div>
      )}
      {subtitle && (
        <p className="text-lg md:text-xl text-charcoal/70 font-sans max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
