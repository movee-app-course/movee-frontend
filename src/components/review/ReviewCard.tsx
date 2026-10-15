import Image from "next/image";
import Link from "next/link";
import { AlertTriangleIcon, FilmIcon, StarIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo, tmdbImage } from "@/lib/utils";
import { Review } from "@/types";
import { SpoilerToggle } from "./SpoilerToggle";

interface ReviewCardProps {
  review: Review;
  showMovie?: boolean;
}

export function ReviewCard({ review, showMovie = true }: ReviewCardProps) {
  const posterUrl = tmdbImage(review.movie?.poster_path, "w92");

  const scoreColor =
  review.score <= 3
    ? "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300"
    : review.score <= 6
      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
      : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";

  return (
    <div className="bg-card text-card-foreground hover:border-primary/30 animate-in-up rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Movie info strip (if showMovie and movie available) */}
      {showMovie && review.movie && (
        <Link
          href={`/movie/${review.movie.tmdb_id}`}
          className="text-muted-foreground hover:text-foreground mb-3 flex items-start gap-2 border-b pb-3 text-sm transition-colors"
        >
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={review.movie.title}
              width={28}
              height={42}
              className="shrink-0 rounded object-cover"
            />
          ) : (
            <div className="bg-muted flex h-10 w-7 shrink-0 items-center justify-center rounded">
              <FilmIcon className="h-3 w-3" />
            </div>
          )}
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-foreground line-clamp-1 text-lg leading-5 font-medium">
              {review.movie.title}
            </span>
            {review.movie.release_date && (
              <span className="text-muted-foreground text-xs leading-4">
                {new Date(review.movie.release_date).getFullYear()}
              </span>
            )}
          </div>
        </Link>
      )}

      {/* User + Score row */}
      <div className="mb-3 flex items-center justify-between">
        <Link
          href={`/user/${review.user.id}`}
          className="group flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Avatar className="group-hover:ring-primary/20 h-9 w-9 ring-2 ring-transparent transition-all">
            <AvatarImage src={review.user.avatarUrl || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {review.user.displayName ? (
                review.user.displayName.charAt(0).toUpperCase()
              ) : (
                <UserIcon className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm leading-none font-semibold">
              {review.user.displayName}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              @{review.user.username}
            </p>
          </div>
        </Link>
        <div className="shrink-0 text-right">
          <div className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm font-bold ${scoreColor}`}>
            <StarIcon className="h-3.5 w-3.5 fill-current" />
            {review.score}
            <span className="text-xs font-normal opacity-60">/10</span>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {timeAgo(review.createdAt)}
          </p>
        </div>
      </div>

      {/* Review text */}
      {review.text && (
        <div className="mt-2">
          {review.hasSpoilers ? (
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                <AlertTriangleIcon className="h-3.5 w-3.5" />
                <span>Содержит спойлеры</span>
              </div>
              <SpoilerToggle text={review.text} />
            </div>
          ) : (
            <p className="text-foreground/85 text-sm leading-relaxed whitespace-pre-wrap">
              {review.text}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
