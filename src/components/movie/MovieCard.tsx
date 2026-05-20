import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types';
import { StarIcon, FilmIcon } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : null;
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : null;

  return (
    <Link href={`/movie/${movie.tmdbId}`} className="group block">
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5 group-hover:border-primary/30">
        <div className="relative aspect-[2/3] w-full bg-muted overflow-hidden">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-muted-foreground gap-2">
              <FilmIcon className="w-10 h-10 opacity-30" />
              <span className="text-xs opacity-50">No Poster</span>
            </div>
          )}
          {movie.voteAverage !== null && movie.voteAverage !== undefined && Number(movie.voteAverage) > 0 && (
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
              <StarIcon className="w-3 h-3 fill-amber-400 text-amber-400" />
              {Number(movie.voteAverage).toFixed(1)}
            </div>
          )}
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 leading-tight" title={movie.title}>
            {movie.title}
          </h3>
          {year && (
            <p className="text-xs text-muted-foreground mt-1">{year}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
