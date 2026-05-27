"use client";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  title: string;
  description: string;
  resetLabel?: string;
  backLabel?: string;
  backHref?: string;
  icon: React.ReactNode;
  onReset: () => void;
}

export function ErrorPage({
  title,
  description,
  resetLabel = "Try again",
  backLabel = "Go home",
  backHref = "/",
  icon,
  onReset,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        {icon}
      </div>

      <h2 className="mb-2 text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mb-6 max-w-md text-muted-foreground">{description}</p>

      <div className="flex gap-3">
        <Button onClick={onReset}>{resetLabel}</Button>
        <Button variant="outline" onClick={() => (window.location.href = backHref)}>
          {backLabel}
        </Button>
      </div>
    </div>
  );
}
