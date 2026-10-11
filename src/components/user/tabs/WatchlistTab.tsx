import { MovieCard } from "@/components/movie/MovieCard";
import { useUserWatchlist } from "@/hooks/use-social";
import { EmptyState } from "./shared/EmptyState";
import { MovieGridLoading } from "./shared/MovieGridLoading";

interface WatchlistTabProps {
  userId: number;
}

export function WatchlistTab({ userId }: WatchlistTabProps) {
  const { data, isLoading } = useUserWatchlist(userId);

  if (isLoading) return <MovieGridLoading />;
  if (!data?.movies?.length)
    return <EmptyState message="Список желаний пуст." />;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {data.movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{
            overview: null,
            backdrop_path: null,
            genres: [],
            ...movie,
            tmdb_id: movie.tmdb_id ?? movie.id,
          }}
        />
      ))}
    </div>
  );
}
