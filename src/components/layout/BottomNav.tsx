"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        <Link
          href="/"
          className={`inline-flex flex-col items-center justify-center px-5 hover:bg-muted group transition-colors ${
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Лента</span>
        </Link>
        <Link
          href="/search"
          className={`inline-flex flex-col items-center justify-center px-5 hover:bg-muted group transition-colors ${
            pathname?.startsWith("/search") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Поиск</span>
        </Link>
        <Link
          href={user ? "/profile" : "/login"}
          className={`inline-flex flex-col items-center justify-center px-5 hover:bg-muted group transition-colors ${
            pathname?.startsWith("/profile") || pathname?.startsWith("/user") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <UserIcon className="w-5 h-5 mb-1" />
          <span className="text-xs">{user ? "Профиль" : "Войти"}</span>
        </Link>
      </div>
    </div>
  );
}
