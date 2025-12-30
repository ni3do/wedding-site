import { ReactNode } from 'react';
import { cn } from '@/app/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-7xl mx-auto px-6 md:px-12 lg:px-24', className)}>
      {children}
    </div>
  );
}
