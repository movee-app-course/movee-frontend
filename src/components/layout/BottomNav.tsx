"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="bg-background fixed bottom-0 left-0 z-50 h-16 w-full border-t md:hidden">
      <div className="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
        <Link
          href="/"
          className={`hover:bg-muted group inline-flex flex-col items-center justify-center px-5 transition-colors ${
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="mb-1 h-5 w-5" />
          <span className="text-xs">Лента</span>
        </Link>
        <Link
          href="/search"
          className={`hover:bg-muted group inline-flex flex-col items-center justify-center px-5 transition-colors ${
            pathname?.startsWith("/search")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Search className="mb-1 h-5 w-5" />
          <span className="text-xs">Поиск</span>
        </Link>
        <Link
          href={user ? "/profile" : "/login"}
          className={`hover:bg-muted group inline-flex flex-col items-center justify-center px-5 transition-colors ${
            pathname?.startsWith("/profile") || pathname?.startsWith("/user")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <UserIcon className="mb-1 h-5 w-5" />
          <span className="text-xs">{user ? "Профиль" : "Войти"}</span>
        </Link>
      </div>
    </div>
  );
}
