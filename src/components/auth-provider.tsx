"use client";

import { useEffect } from "react";
import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";
import type { AuthUser } from "@/types";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider — runs on client mount and validates the httpOnly JWT cookie
 * by calling GET /auth/me. Sets the Zustand auth store accordingly.
 *
 * This ensures the user state is accurate even after a hard refresh,
 * without relying solely on the persisted Zustand slice.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);

    apiClient
      .get<{ user: AuthUser }>("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        // 401 → not logged in; clear any stale persisted state
        setUser(null);
      });
  }, [setUser, setLoading]);

  return <>{children}</>;
}
