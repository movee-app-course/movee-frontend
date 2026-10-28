"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpoilerToggleProps {
  text: string;
}

export function SpoilerToggle({ text }: SpoilerToggleProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {
    return (
      <div>
        <p className="text-sm whitespace-pre-wrap">{text}</p>
        <Button
          variant="link"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground mt-1 h-auto px-0"
        >
          <EyeOffIcon className="mr-1 h-3 w-3" />
          Скрыть спойлер
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-muted/50 border-muted-foreground/30 rounded border border-dashed p-4 text-center">
      <p className="text-muted-foreground mb-2 text-sm">
        Этот отзыв содержит спойлеры.
      </p>
      <Button variant="secondary" size="sm" onClick={() => setIsVisible(true)}>
        <EyeIcon className="mr-2 h-4 w-4" />
        Показать спойлеры
      </Button>
    </div>
  );
}
