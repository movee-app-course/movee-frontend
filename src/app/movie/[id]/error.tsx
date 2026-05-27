"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/ui/ErrorPage";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const MovieIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

export default function MovieError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Movie page error:", error);
  }, [error]);

  return (
    <ErrorPage
      icon={MovieIcon}
      title="Failed to load movie"
      description="We couldn't load this movie page. The movie might not exist or there was a connection issue."
      backLabel="Back to feed"
      onReset={reset}
    />
  );
}
