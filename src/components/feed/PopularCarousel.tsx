"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { PopularMovieStats } from "@/hooks/use-feed";
import { tmdbImage } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface PopularCarouselProps {
  movies: PopularMovieStats[];
  isLoading: boolean;
}

export function PopularCarousel({ movies, isLoading }: PopularCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const viewport = carouselRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]',
    );

    if (!(viewport instanceof HTMLElement)) return;

    setCanScrollLeft(viewport.scrollLeft > 0);
    setCanScrollRight(
      viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1,
    );
  };

  const scroll = (direction: "left" | "right") => {
    const viewport = carouselRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]',
    );

    if (!(viewport instanceof HTMLElement)) return;

    viewport.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const viewport = carouselRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]',
    );

    if (!(viewport instanceof HTMLElement)) return;

    updateScrollState();

    viewport.addEventListener("scroll", updateScrollState);

    return () => {
      viewport.removeEventListener("scroll", updateScrollState);
    };
  }, [movies]);

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
      <div ref={carouselRef} className="relative">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 px-1">
            {movies.map((movie) => {
              const posterUrl =
                tmdbImage(movie.poster_path, "w200") ||
                "/placeholder-poster.png";

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

        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="bg-background/90 hover:bg-background absolute top-[90px] left-2 z-10 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-sm md:flex"
            aria-label="Прокрутить влево"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="bg-background/90 hover:bg-background absolute top-[90px] right-2 z-10 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-sm md:flex"
            aria-label="Прокрутить вправо"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
