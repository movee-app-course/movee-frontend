import { PopularMovieStats } from '@/hooks/use-feed';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface PopularCarouselProps {
  movies: PopularMovieStats[];
  isLoading: boolean;
}

export function PopularCarousel({ movies, isLoading }: PopularCarouselProps) {
  if (isLoading) {
    return (
      <div className="space-y-2 mb-6">
        <h2 className="text-lg font-semibold px-1">Популярное у подписок</h2>
        <div className="flex gap-4 overflow-hidden px-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[120px] shrink-0 space-y-2">
              <Skeleton className="h-[180px] w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 mb-6">
      <h2 className="text-lg font-semibold px-1">Популярное у подписок</h2>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex w-max space-x-4 px-1">
          {movies.map((movie) => {
            const posterUrl = movie.posterPath 
              ? `https://image.tmdb.org/t/p/w200${movie.posterPath}`
              : '/placeholder-poster.png';

            return (
              <Link 
                key={movie.id} 
                href={`/movie/${movie.tmdbId}`}
                className="w-[120px] shrink-0 group"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-muted">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="120px"
                  />
                  <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <StarIcon className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    {movie.averageScore.toFixed(1)}
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-medium line-clamp-1 group-hover:underline" title={movie.title}>
                  {movie.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Оценили: {movie.ratingCount}
                </p>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
