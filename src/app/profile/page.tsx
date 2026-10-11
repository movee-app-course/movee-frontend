"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/components/user/UserProfile";
import { useAuthStore } from "@/stores/auth-store";

export default function ProfilePage() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user === null) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return null; // or loading spinner while checking auth
  }

  return <UserProfile userId={user.id} isOwnProfile={true} />;
}
