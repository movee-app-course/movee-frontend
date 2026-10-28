"use client";

import { FeedList } from "@/components/feed/FeedList";
import { PopularCarousel } from "@/components/feed/PopularCarousel";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFeed, usePersonalFeed, usePopularFeed } from "@/hooks/use-feed";
import { useAuthStore } from "@/stores/auth-store";
import { Rss, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();

  const generalFeed = useFeed();
  const personalFeed = usePersonalFeed();
  const popularFeed = usePopularFeed();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      {/* Hero header */}
      <div className="mb-8">
        <h1 className="from-primary bg-gradient-to-r to-violet-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          Movee
        </h1>
        <p className="text-muted-foreground mt-1">Что смотрят ваши друзья?</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger
            value="general"
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <Rss className="h-4 w-4" />
            Лента
          </TabsTrigger>
          <TabsTrigger
            value="personal"
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Для вас
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0 space-y-4">
          <FeedList
            data={generalFeed.data}
            isLoading={generalFeed.isLoading}
            isFetchingNextPage={generalFeed.isFetchingNextPage}
            hasNextPage={!!generalFeed.hasNextPage}
            fetchNextPage={generalFeed.fetchNextPage}
          />
        </TabsContent>

        <TabsContent value="personal" className="mt-0">
          {isAuthLoading ? (
            <div className="space-y-4">
              <div className="mb-6 space-y-2">
                <Skeleton className="h-6 w-48" />
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton
                      key={i}
                      className="h-[180px] w-[120px] rounded-xl"
                    />
                  ))}
                </div>
              </div>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-3 rounded-xl border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-3 w-[100px]" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : isAuthenticated ? (
            <div className="space-y-6">
              <PopularCarousel
                movies={popularFeed.data || []}
                isLoading={popularFeed.isLoading}
              />
              <div>
                <h2 className="mb-4 px-1 text-lg font-semibold">
                  Рецензии друзей
                </h2>
                <FeedList
                  data={personalFeed.data}
                  isLoading={personalFeed.isLoading}
                  isFetchingNextPage={personalFeed.isFetchingNextPage}
                  hasNextPage={!!personalFeed.hasNextPage}
                  fetchNextPage={personalFeed.fetchNextPage}
                />
              </div>
            </div>
          ) : (
            <div className="from-card to-primary/5 flex flex-col items-center justify-center rounded-2xl border bg-gradient-to-b px-4 py-16 text-center">
              <div className="bg-primary/10 mb-5 rounded-full p-5">
                <Sparkles className="text-primary h-10 w-10" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">
                Присоединяйтесь к Movee
              </h2>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Войдите, чтобы видеть отзывы людей, на которых подписаны, и
                узнавать, что смотрят ваши друзья на этой неделе.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/register"
                  className={buttonVariants({ size: "lg" })}
                >
                  Начать
                </Link>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Войти
                </Link>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
