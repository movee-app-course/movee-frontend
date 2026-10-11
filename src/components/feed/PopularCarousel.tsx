import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { PopularMovieStats } from "@/hooks/use-feed";
import { tmdbImage } from "@/lib/utils";

interface PopularCarouselProps {
  movies: PopularMovieStats[];
  isLoading: boolean;
}

export function PopularCarousel({ movies, isLoading }: PopularCarouselProps) {
  if (isLoading) {
    return (
      <div className="mb-6 space-y-2">
        <h2 className="px-1 text-lg font-semibold">Популярное у подписок</h2>
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
    <div className="mb-6 space-y-2">
      <h2 className="px-1 text-lg font-semibold">Популярное у подписок</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-1">
          {movies.map((movie) => {
            const posterUrl =
              tmdbImage(movie.poster_path, "w200") || "/placeholder-poster.png";

            return (
              <Link
                key={movie.id}
                href={`/movie/${movie.tmdb_id}`}
                className="group w-[120px] shrink-0"
              >
                <div className="bg-muted relative aspect-[2/3] w-full overflow-hidden rounded-md">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="120px"
                  />
                  <div className="absolute top-1 right-1 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                    <StarIcon className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                    {movie.averageScore.toFixed(1)}
                  </div>
                </div>
                <h3
                  className="mt-2 line-clamp-1 text-sm font-medium group-hover:underline"
                  title={movie.title}
                >
                  {movie.title}
                </h3>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Оценили: {movie.ratingCount}
                </p>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}
