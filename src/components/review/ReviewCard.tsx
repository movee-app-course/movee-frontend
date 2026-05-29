import { Review } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { StarIcon, UserIcon, FilmIcon, AlertTriangleIcon } from 'lucide-react';
import { SpoilerToggle } from './SpoilerToggle';
import { tmdbImage } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReviewCardProps {
  review: Review;
  showMovie?: boolean;
}

export function ReviewCard({ review, showMovie = true }: ReviewCardProps) {
  const posterUrl = tmdbImage(review.movie?.poster_path, 'w92');

  return (
    <div className="group p-4 border rounded-xl bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-in-up">
      {/* Movie info strip (if showMovie and movie available) */}
      {showMovie && review.movie && (
        <Link
          href={`/movie/${review.movie.tmdb_id}`}
          className="flex items-center gap-2 mb-3 pb-3 border-b text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={review.movie.title}
              width={28}
              height={42}
              className="rounded object-cover shrink-0"
            />
          ) : (
            <div className="w-7 h-10 rounded bg-muted flex items-center justify-center shrink-0">
              <FilmIcon className="w-3 h-3" />
            </div>
          )}
          <span className="font-medium line-clamp-1">{review.movie.title}</span>
          {review.movie.release_date && (
            <span className="shrink-0 text-xs opacity-70">
              {new Date(review.movie.release_date).getFullYear()}
            </span>
          )}
        </Link>
      )}

      {/* User + Score row */}
      <div className="flex items-center justify-between mb-3">
        <Link href={`/user/${review.user.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Avatar className="h-9 w-9 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
            <AvatarImage src={review.user.avatarUrl || ''} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {review.user.displayName ? review.user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold leading-none">{review.user.displayName}</p>
            <p className="text-xs text-muted-foreground mt-0.5">@{review.user.username}</p>
          </div>
        </Link>
        <div className="text-right shrink-0">
          <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2.5 py-1 rounded-lg text-sm font-bold">
            <StarIcon className="w-3.5 h-3.5 fill-current" />
            {review.score}
            <span className="text-xs font-normal opacity-60">/10</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: ru })}
          </p>
        </div>
      </div>

      {/* Review text */}
      {review.text && (
        <div className="mt-2">
          {review.hasSpoilers ? (
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 mb-1.5">
                <AlertTriangleIcon className="w-3.5 h-3.5" />
                <span>Содержит спойлеры</span>
              </div>
              <SpoilerToggle text={review.text} />
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">{review.text}</p>
          )}
        </div>
      )}
    </div>
  );
}
