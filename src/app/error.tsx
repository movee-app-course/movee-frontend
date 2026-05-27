"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/ui/ErrorPage";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const WarningIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
  </svg>
);

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <ErrorPage
      icon={WarningIcon}
      title="Something went wrong"
      description={
        error.digest
          ? `An unexpected error occurred (ID: ${error.digest}). Please try again or refresh the page.`
          : "An unexpected error occurred. Please try again or refresh the page."
      }
      onReset={reset}
    />
  );
}
