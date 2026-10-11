"use client";

import { useState } from "react";
import { FilmIcon, SearchIcon } from "lucide-react";
import { MovieCard } from "@/components/movie/MovieCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { useMovieSearch } from "@/hooks/use-movies";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const { data: movies, isLoading, isError } = useMovieSearch(debouncedQuery);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Поиск фильмов</h1>
      <p className="text-muted-foreground mb-6">
        Найдите любой фильм и узнайте, что думают о нём ваши друзья.
      </p>

      <div className="relative mb-8 max-w-xl">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
        <Input
          id="movie-search-input"
          type="text"
          placeholder="Введите название фильма..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 pl-10 text-base"
          autoFocus
        />
      </div>

      {/* Loading skeleton grid */}
      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-[2/3] w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-destructive/10 mb-4 rounded-full p-4">
            <FilmIcon className="text-destructive h-8 w-8" />
          </div>
          <h3 className="mb-1 text-lg font-semibold">Произошла ошибка</h3>
          <p className="text-muted-foreground text-sm">
            Не удалось загрузить фильмы. Попробуйте ещё раз.
          </p>
        </div>
      )}

      {/* No results */}
      {!isLoading && !isError && debouncedQuery && movies?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted mb-4 rounded-full p-4">
            <SearchIcon className="text-muted-foreground/50 h-8 w-8" />
          </div>
          <h3 className="mb-1 text-lg font-semibold">Результаты не найдены</h3>
          <p className="text-muted-foreground text-sm">
            Фильмы по запросу &quot;{debouncedQuery}&quot; не найдены.
            Попробуйте другое название.
          </p>
        </div>
      )}

      {/* Empty prompt (no query yet) */}
      {!debouncedQuery && !isLoading && (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-16 text-center">
          <FilmIcon className="mb-3 h-12 w-12 opacity-20" />
          <p className="text-sm">Начните вводить, чтобы найти фильмы</p>
        </div>
      )}

      {/* Results grid */}
      {!isLoading && !isError && movies && movies.length > 0 && (
        <div className="animate-in-up grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.tmdb_id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
