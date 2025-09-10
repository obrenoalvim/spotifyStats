'use client';

import { Button } from '@/components/ui/button';

interface TimeRangeSelectorProps {
  value: 'short_term' | 'medium_term' | 'long_term';
  onChange: (value: 'short_term' | 'medium_term' | 'long_term') => void;
}

export default function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const options = [
    { value: 'short_term' as const, label: 'Last 4 weeks' },
    { value: 'medium_term' as const, label: 'Last 6 months' },
    { value: 'long_term' as const, label: 'All time' },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange(option.value)}
          className={`flex-1 ${
            value === option.value
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'hover:bg-background'
          }`}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}