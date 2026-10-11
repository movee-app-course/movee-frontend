import Image from "next/image";
import { StarIcon } from "lucide-react";
import { tmdbImage } from "@/lib/utils";
import { Movie } from "@/types";

interface MovieDetailsProps {
  movie: Movie;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const posterUrl = tmdbImage(movie.poster_path, "w500");

  const backdropUrl = tmdbImage(movie.backdrop_path, "w1280");

  return (
    <div className="relative">
      {/* Backdrop */}
      {backdropUrl && (
        <div className="absolute top-0 left-0 -z-10 h-[400px] w-full overflow-hidden">
          <Image
            src={backdropUrl}
            alt="Backdrop"
            fill
            className="object-cover opacity-15 dark:opacity-10"
            priority
          />
          <div className="from-background via-background/60 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
      )}

      <div className="container mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 pt-10 md:flex-row md:pt-16">
        {/* Poster */}
        <div className="mx-auto w-40 flex-shrink-0 sm:w-52 md:mx-0 md:w-64">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border shadow-2xl">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center text-sm">
                Нет постера
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-grow flex-col">
          <h1 className="mb-1 text-3xl leading-tight font-bold md:text-4xl">
            {movie.title}
          </h1>

          {movie.original_title && movie.original_title !== movie.title && (
            <p className="text-muted-foreground mb-3 text-lg">
              {movie.original_title}
            </p>
          )}

          <div className="mb-4 flex flex-wrap items-center gap-2">
            {movie.release_date && (
              <span className="text-md text-muted-foreground font-semibold">
                {new Date(movie.release_date).getFullYear()}
              </span>
            )}
            {movie.vote_average && Number(movie.vote_average) > 0 && (
              <span className="text-md inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                <StarIcon className="h-3 w-3 fill-current" />
                {Number(movie.vote_average).toFixed(1)} TMDB
              </span>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="bg-secondary text-secondary-foreground text-md rounded-full px-2.5 py-0.5 font-medium"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {movie.overview && (
            <div className="max-w-2xl space-y-2">
              <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                О фильме
              </h2>
              <p className="text-foreground/80 text-sm leading-relaxed md:text-base">
                {movie.overview}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
