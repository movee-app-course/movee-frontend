"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFeed, usePersonalFeed, usePopularFeed } from "@/hooks/use-feed";
import { FeedList } from "@/components/feed/FeedList";
import { PopularCarousel } from "@/components/feed/PopularCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Rss } from "lucide-react";

export default function HomePage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();

  const generalFeed = useFeed();
  const personalFeed = usePersonalFeed();
  const popularFeed = usePopularFeed();

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      {/* Hero header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
          Movee
        </h1>
        <p className="text-muted-foreground mt-1">
          What are your people watching?
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Rss className="w-4 h-4" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            For You
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-0">
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
              <div className="space-y-2 mb-6">
                <Skeleton className="h-6 w-48" />
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[180px] w-[120px] rounded-xl" />
                  ))}
                </div>
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col space-y-3 p-4 border rounded-xl">
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
                <h2 className="text-lg font-semibold px-1 mb-4">
                  Reviews from people you follow
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
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border rounded-2xl bg-gradient-to-b from-card to-primary/5">
              <div className="rounded-full bg-primary/10 p-5 mb-5">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Join Movee</h2>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Sign in to see reviews from people you follow and discover what
                your circle is watching this week.
              </p>
              <div className="flex gap-3">
                <Link href="/register" className={buttonVariants({ size: "lg" })}>
                  Get started
                </Link>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Log in
                </Link>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
