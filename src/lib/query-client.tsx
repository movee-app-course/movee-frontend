"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Don't refetch on window focus by default — user controls it
        refetchOnWindowFocus: false,
        // Keep data fresh for 1 minute
        staleTime: 60 * 1000,
        // Keep unused data in cache for 5 minutes
        gcTime: 5 * 60 * 1000,
        retry: 1,
      },
    },
  });
}

// Server-side singleton (Next.js App Router SSR)
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: reuse a single instance
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // useState ensures client-side instance is stable across re-renders
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
