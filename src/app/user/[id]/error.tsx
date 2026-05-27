"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/ui/ErrorPage";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const UserIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

export default function UserError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("User page error:", error);
  }, [error]);

  return (
    <ErrorPage
      icon={UserIcon}
      title="Failed to load profile"
      description="We couldn't load this user profile. The user might not exist or there was a connection issue."
      backLabel="Back to feed"
      onReset={reset}
    />
  );
}
