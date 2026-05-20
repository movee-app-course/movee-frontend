'use client';

import { useMovie, useMovieStats, useWatchlistMutation, useWatchedMutation } from '@/hooks/use-movies';
import { useMovieReviews } from '@/hooks/use-reviews';
import { useAuthStore } from '@/stores/auth-store';
import { MovieDetails } from '@/components/movie/MovieDetails';
import { ReviewForm } from '@/components/review/ReviewForm';
import { ReviewCard } from '@/components/review/ReviewCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BookmarkIcon, BookmarkCheckIcon, EyeIcon, CheckCircleIcon, FilmIcon, LogInIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        {/* Backdrop skeleton */}
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

          {/* Review Form */}
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
                    <Link href="/login" className={buttonVariants({ size: "sm" })}>Log in</Link>
                    <Link href="/register" className={buttonVariants({ variant: "outline", size: "sm" })}>Sign up</Link>
                  </div>
                </CardContent>
              </Card>
            )
          )}

          {/* Reviews List */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Reviews
              {reviewsData?.reviews && reviewsData.reviews.length > 0 && (
                <span className="text-base font-normal text-muted-foreground ml-2">
                  ({reviewsData.reviews.length})
                </span>
              )}
            </h3>
            {isReviewsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border rounded-xl space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-14 w-full" />
                  </div>
                ))}
              </div>
            ) : reviewsData?.reviews && reviewsData.reviews.length > 0 ? (
              <div className="space-y-4">
                {reviewsData.reviews.map(review => (
                  <ReviewCard key={review.id} review={review} showMovie={false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 border rounded-xl bg-card/50">
                <p className="text-muted-foreground text-sm">
                  No reviews yet. Be the first to review!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-4">
          {/* Action Buttons */}
          {_hasHydrated && user && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button
                  variant={stats?.inWatchlist ? 'secondary' : 'outline'}
                  className="w-full justify-start gap-2 transition-all"
                  onClick={() => watchlistMutation.mutate(stats?.inWatchlist ? 'remove' : 'add')}
                  disabled={watchlistMutation.isPending}
                >
                  {stats?.inWatchlist
                    ? <BookmarkCheckIcon className="w-4 h-4 text-primary" />
                    : <BookmarkIcon className="w-4 h-4" />}
                  {stats?.inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                </Button>

                <Button
                  variant={stats?.isWatched ? 'secondary' : 'outline'}
                  className="w-full justify-start gap-2 transition-all"
                  onClick={() => watchedMutation.mutate(stats?.isWatched ? 'remove' : 'add')}
                  disabled={watchedMutation.isPending}
                >
                  {stats?.isWatched
                    ? <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    : <EyeIcon className="w-4 h-4" />}
                  {stats?.isWatched ? 'Watched' : 'Mark as Watched'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stats Card */}
          {isStatsLoading ? (
            <Card>
              <CardHeader className="pb-2"><Skeleton className="h-5 w-24" /></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-8 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </CardContent>
            </Card>
          ) : stats && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Average Rating</p>
                  <p className="text-3xl font-bold">
                    {stats.averageScore ? stats.averageScore : '—'}
                    {stats.averageScore && <span className="text-base font-normal text-muted-foreground">/10</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{stats.totalRatings} ratings</p>
                </div>

                {_hasHydrated && user && (stats.friendsWatched > 0 || stats.friendsAverageScore) && (
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Friends&apos; Rating</p>
                    <p className="text-3xl font-bold">
                      {stats.friendsAverageScore ? stats.friendsAverageScore : '—'}
                      {stats.friendsAverageScore && <span className="text-base font-normal text-muted-foreground">/10</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{stats.friendsWatched} friends watched</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
