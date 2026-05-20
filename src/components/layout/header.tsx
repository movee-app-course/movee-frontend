"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Film, User as UserIcon, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4 sm:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Film className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Movee
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-foreground/80 ${pathname === "/" ? "text-foreground" : "text-foreground/60"
                }`}
            >
              Feed
            </Link>
            <Link
              href="/search"
              className={`transition-colors hover:text-foreground/80 ${pathname?.startsWith("/search")
                ? "text-foreground"
                : "text-foreground/60"
                }`}
            >
              Search
            </Link>
          </nav>
        </div>

        {/* Mobile Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <Film className="h-6 w-6" />
          <span className="font-bold">Movee</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-primary/40 transition-all">
                    <AvatarImage src={user.avatarUrl || ""} alt={user.displayName} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {user.displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.displayName}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push('/profile')}
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className={`hidden sm:flex ${buttonVariants({ variant: 'ghost' })}`}>
                  Log in
                </Link>
                <Link href="/register" className={buttonVariants()}>
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
