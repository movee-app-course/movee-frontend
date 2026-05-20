'use client';

import { useState } from 'react';
import { useMovieSearch } from '@/hooks/use-movies';
import { MovieCard } from '@/components/movie/MovieCard';
import { Input } from '@/components/ui/input';
import { SearchIcon, FilmIcon } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  const { data: movies, isLoading, isError } = useMovieSearch(debouncedQuery);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Search Movies</h1>
      <p className="text-muted-foreground mb-6">Find any movie and see what your people think about it.</p>

      <div className="relative mb-8 max-w-xl">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          id="movie-search-input"
          type="text"
          placeholder="Type a movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-base"
          autoFocus
        />
      </div>

      {/* Loading skeleton grid */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
          <div className="rounded-full bg-destructive/10 p-4 mb-4">
            <FilmIcon className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Something went wrong</h3>
          <p className="text-muted-foreground text-sm">
            Failed to fetch movies. Please try again.
          </p>
        </div>
      )}

      {/* No results */}
      {!isLoading && !isError && debouncedQuery && movies?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <SearchIcon className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No results found</h3>
          <p className="text-muted-foreground text-sm">
            No movies found for &quot;{debouncedQuery}&quot;. Try a different title.
          </p>
        </div>
      )}

      {/* Empty prompt (no query yet) */}
      {!debouncedQuery && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
          <FilmIcon className="w-12 h-12 opacity-20 mb-3" />
          <p className="text-sm">Start typing to discover movies</p>
        </div>
      )}

      {/* Results grid */}
      {!isLoading && !isError && movies && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-in-up">
          {movies.map((movie) => (
            <MovieCard key={movie.tmdbId} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
