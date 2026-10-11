"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Film, LogOut, User as UserIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth-store";

export function Header() {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center px-4 sm:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Film className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Movee</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={`hover:text-foreground/80 transition-colors ${
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Лента
            </Link>
            <Link
              href="/search"
              className={`hover:text-foreground/80 transition-colors ${
                pathname?.startsWith("/search")
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
            >
              Поиск
            </Link>
          </nav>
        </div>

        {/* Mobile Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <Film className="h-6 w-6" />
          <span className="font-bold">Movee</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2">
          <nav className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full border-0 bg-transparent p-0 outline-none focus:ring-0 focus:outline-none">
                  <Avatar className="hover:ring-primary/40 h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all">
                    <AvatarImage
                      src={user.avatarUrl || ""}
                      alt={user.displayName}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {user.displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.displayName}</p>
                      <p className="text-muted-foreground w-[200px] truncate text-sm">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className={`hidden sm:flex ${buttonVariants({ variant: "ghost" })}`}
                >
                  Войти
                </Link>
                <Link href="/register" className={buttonVariants()}>
                  Зарегистрироваться
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
