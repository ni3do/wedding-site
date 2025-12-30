import { ReactNode } from 'react';
import { cn } from '@/app/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  background?: 'cream' | 'white';
}

export default function Card({ children, className, background = 'white' }: CardProps) {
  const backgrounds = {
    cream: 'bg-cream',
    white: 'bg-white',
  };

  return (
    <div
      className={cn(
        'rounded-2xl shadow-lg p-6 md:p-8',
        backgrounds[background],
        className
      )}
    >
      {children}
    </div>
  );
}
