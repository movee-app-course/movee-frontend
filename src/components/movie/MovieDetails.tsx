import Image from 'next/image';
import { Movie } from '@/types';
import { format } from 'date-fns';
import { StarIcon } from 'lucide-react';
import { tmdbImage } from '@/lib/utils';

interface MovieDetailsProps {
  movie: Movie;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const posterUrl = tmdbImage(movie.poster_path, 'w500');

  const backdropUrl = tmdbImage(movie.backdrop_path, 'w1280');

  return (
    <div className="relative">
      {/* Backdrop */}
      {backdropUrl && (
        <div className="absolute top-0 left-0 w-full h-[400px] -z-10 overflow-hidden">
          <Image
            src={backdropUrl}
            alt="Backdrop"
            fill
            className="object-cover opacity-15 dark:opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-10 max-w-6xl flex flex-col md:flex-row gap-8 pt-10 md:pt-16">
        {/* Poster */}
        <div className="flex-shrink-0 w-40 sm:w-52 md:w-64 mx-auto md:mx-0">
          <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl border">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                Нет постера
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow min-w-0">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-1">{movie.title}</h1>

          {movie.original_title && movie.original_title !== movie.title && (
            <p className="text-lg text-muted-foreground mb-3">{movie.original_title}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {movie.release_date && (
              <span className="text-sm font-semibold text-muted-foreground">
                {format(new Date(movie.release_date), 'yyyy')}
              </span>
            )}
            {movie.vote_average && Number(movie.vote_average) > 0 && (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 text-xs font-bold px-2 py-0.5 rounded-md">
                <StarIcon className="w-3 h-3 fill-current" />
                {Number(movie.vote_average).toFixed(1)} TMDB
              </span>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {movie.genres.map(g => (
                  <span
                    key={g.id}
                    className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {movie.overview && (
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">О фильме</h2>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                {movie.overview}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
