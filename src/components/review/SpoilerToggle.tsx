'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface SpoilerToggleProps {
  text: string;
}

export function SpoilerToggle({ text }: SpoilerToggleProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {
    return (
      <div>
        <p className="whitespace-pre-wrap text-sm">{text}</p>
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => setIsVisible(false)}
          className="px-0 mt-1 h-auto text-muted-foreground hover:text-foreground"
        >
          <EyeOffIcon className="w-3 h-3 mr-1" />
          Скрыть спойлер
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-muted/50 rounded p-4 text-center border border-dashed border-muted-foreground/30">
      <p className="text-sm text-muted-foreground mb-2">Этот отзыв содержит спойлеры.</p>
      <Button variant="secondary" size="sm" onClick={() => setIsVisible(true)}>
        <EyeIcon className="w-4 h-4 mr-2" />
        Показать спойлеры
      </Button>
    </div>
  );
}
