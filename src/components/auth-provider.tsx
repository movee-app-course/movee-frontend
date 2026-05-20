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
  const { token, setUser, setLoading, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!_hasHydrated) return;

    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);

    apiClient
      .get<{ user: AuthUser }>("/auth/me")
      .then((res) => {
        // Keeps user profile active and updates details from server
        setUser(res.data.user);
      })
      .catch(() => {
        // 401/expired → clear stale token & user state
        setUser(null, null);
      });
  }, [token, _hasHydrated, setUser, setLoading]);

  return <>{children}</>;
}
