"use client";

import Link from "next/link";
import { FilmIcon, LogInIcon } from "lucide-react";
import { MovieActionsCard } from "@/components/movie/MovieActionsCard";
import { MovieDetails } from "@/components/movie/MovieDetails";
import { MovieReviewsList } from "@/components/movie/MovieReviewsList";
import { MovieStatsCard } from "@/components/movie/MovieStatsCard";
import { ReviewForm } from "@/components/review/ReviewForm";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useMovie,
  useMovieStats,
  useWatchedMutation,
  useWatchlistMutation,
} from "@/hooks/use-movies";
import { useMovieReviews } from "@/hooks/use-reviews";
import { useAuthStore } from "@/stores/auth-store";
import type { Movie } from "@/types";

interface MoviePageClientProps {
  movieId: number;
  initialMovieData?: Movie | null;
}

export function MoviePageClient({
  movieId,
  initialMovieData,
}: MoviePageClientProps) {
  const { user, _hasHydrated } = useAuthStore();

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError,
  } = useMovie(movieId, initialMovieData || undefined);
  const { data: stats, isLoading: isStatsLoading } = useMovieStats(movieId);
  const { data: reviewsData, isLoading: isReviewsLoading } =
    useMovieReviews(movieId);

  const watchlistMutation = useWatchlistMutation(movieId);
  const watchedMutation = useWatchedMutation(movieId);

  if (isMovieLoading) {
    return (
      <div>
        <Skeleton className="h-64 w-full rounded-none md:h-80" />
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-3">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="bg-muted mb-4 rounded-full p-5">
          <FilmIcon className="text-muted-foreground/50 h-10 w-10" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Фильм не найден</h1>
        <p className="text-muted-foreground mb-6">
          Этого фильма не существует или его не удалось загрузить.
        </p>
        <Link href="/search" className={buttonVariants()}>
          Поиск фильмов
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in-up">
      <MovieDetails movie={movie} />

      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
        {/* Main Content (Left) */}
        <div className="space-y-8 md:col-span-2">
          {_hasHydrated &&
            (user ? (
              <ReviewForm
                movieId={movieId}
                initialScore={stats?.myRating?.score}
                initialText={
                  reviewsData?.reviews.find((r) => r.user.id === user.id)?.text
                }
                initialSpoilers={
                  reviewsData?.reviews.find((r) => r.user.id === user.id)
                    ?.hasSpoilers
                }
              />
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <LogInIcon className="text-muted-foreground/50 mx-auto mb-3 h-8 w-8" />
                  <p className="text-muted-foreground mb-4 text-sm">
                    Войдите, чтобы оценить и оставить отзыв на фильм.
                  </p>
                  <div className="flex justify-center gap-2">
                    <Link
                      href="/login"
                      className={buttonVariants({ size: "sm" })}
                    >
                      Войти
                    </Link>
                    <Link
                      href="/register"
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      Зарегистрироваться
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}

          <MovieReviewsList
            reviews={reviewsData?.reviews}
            isLoading={isReviewsLoading}
          />
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-4">
          {_hasHydrated && user && (
            <MovieActionsCard
              stats={stats}
              watchlistMutation={watchlistMutation}
              watchedMutation={watchedMutation}
            />
          )}

          <MovieStatsCard stats={stats} isLoading={isStatsLoading} />
        </div>
      </div>
    </div>
  );
}
