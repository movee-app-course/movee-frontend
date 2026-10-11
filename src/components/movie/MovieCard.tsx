import Image from "next/image";
import Link from "next/link";
import { FilmIcon, StarIcon } from "lucide-react";
import { tmdbImage } from "@/lib/utils";
import { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;
  const posterUrl = tmdbImage(movie.poster_path, "w500");

  return (
    <Link href={`/movie/${movie.tmdb_id}`} className="group block">
      <div className="bg-card group-hover:border-primary/30 overflow-hidden rounded-xl border shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
        <div className="bg-muted relative aspect-[2/3] w-full overflow-hidden">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2">
              <FilmIcon className="h-10 w-10 opacity-30" />
              <span className="text-xs opacity-50">No Poster</span>
            </div>
          )}
          {movie.vote_average !== null &&
            movie.vote_average !== undefined &&
            Number(movie.vote_average) > 0 && (
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
                <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
                {Number(movie.vote_average).toFixed(1)}
              </div>
            )}
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
        <div className="p-3">
          <h3
            className="line-clamp-2 text-sm leading-tight font-semibold"
            title={movie.title}
          >
            {movie.title}
          </h3>
          {year && <p className="text-muted-foreground mt-1 text-xs">{year}</p>}
        </div>
      </div>
    </Link>
  );
}
