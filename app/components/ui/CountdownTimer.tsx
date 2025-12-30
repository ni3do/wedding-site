'use client';

import { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '@/app/lib/utils';
import Card from './Card';

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeRemaining.isPast) {
    return (
      <div className="text-center py-8">
        <p className="text-3xl md:text-4xl font-serif text-terracotta">
          The wedding day is here! 🎉
        </p>
      </div>
    );
  }

  const timeUnits = [
    { value: timeRemaining.days, label: 'Days' },
    { value: timeRemaining.hours, label: 'Hours' },
    { value: timeRemaining.minutes, label: 'Minutes' },
    { value: timeRemaining.seconds, label: 'Seconds' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {timeUnits.map((unit) => (
        <Card key={unit.label} background="white" className="text-center">
          <div className="text-4xl md:text-5xl font-serif font-bold text-terracotta">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base text-charcoal mt-2 font-sans uppercase tracking-wider">
            {unit.label}
          </div>
        </Card>
      ))}
    </div>
  );
}
