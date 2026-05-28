'use client';

import { useMovie, useMovieStats, useWatchlistMutation, useWatchedMutation } from '@/hooks/use-movies';
import { useMovieReviews } from '@/hooks/use-reviews';
import { useAuthStore } from '@/stores/auth-store';
import { MovieDetails } from '@/components/movie/MovieDetails';
import { MovieActionsCard } from '@/components/movie/MovieActionsCard';
import { MovieStatsCard } from '@/components/movie/MovieStatsCard';
import { MovieReviewsList } from '@/components/movie/MovieReviewsList';
import { ReviewForm } from '@/components/review/ReviewForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { FilmIcon, LogInIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import type { Movie } from '@/types';

interface MoviePageClientProps {
  movieId: number;
  initialMovieData?: Movie | null;
}

export function MoviePageClient({ movieId, initialMovieData }: MoviePageClientProps) {
  const { user, _hasHydrated } = useAuthStore();

  const { data: movie, isLoading: isMovieLoading, isError } = useMovie(movieId, initialMovieData || undefined);
  const { data: stats, isLoading: isStatsLoading } = useMovieStats(movieId);
  const { data: reviewsData, isLoading: isReviewsLoading } = useMovieReviews(movieId);

  const watchlistMutation = useWatchlistMutation(movieId);
  const watchedMutation = useWatchedMutation(movieId);

  if (isMovieLoading) {
    return (
      <div>
        <Skeleton className="w-full h-64 md:h-80 rounded-none" />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
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
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="rounded-full bg-muted p-5 mb-4">
          <FilmIcon className="w-10 h-10 text-muted-foreground/50" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Movie not found</h1>
        <p className="text-muted-foreground mb-6">
          This movie doesn&apos;t exist or couldn&apos;t be loaded.
        </p>
        <Link href="/search" className={buttonVariants()}>Search movies</Link>
      </div>
    );
  }

  return (
    <div className="animate-in-up">
      <MovieDetails movie={movie} />

      <div className="container mx-auto px-4 py-8 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Main Content (Left) */}
        <div className="md:col-span-2 space-y-8">
          {_hasHydrated && (
            user ? (
              <ReviewForm
                movieId={movieId}
                initialScore={stats?.myRating?.score}
                initialText={reviewsData?.reviews.find(r => r.user.id === user.id)?.text}
                initialSpoilers={reviewsData?.reviews.find(r => r.user.id === user.id)?.hasSpoilers}
              />
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <LogInIcon className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm mb-4">
                    Log in to rate and review this movie.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Link href="/login" className={buttonVariants({ size: 'sm' })}>Log in</Link>
                    <Link href="/register" className={buttonVariants({ variant: 'outline', size: 'sm' })}>Sign up</Link>
                  </div>
                </CardContent>
              </Card>
            )
          )}

          <MovieReviewsList reviews={reviewsData?.reviews} isLoading={isReviewsLoading} />
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
