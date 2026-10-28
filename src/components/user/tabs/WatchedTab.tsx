import { MovieCard } from "@/components/movie/MovieCard";
import { useUserWatched } from "@/hooks/use-social";
import { EmptyState } from "./shared/EmptyState";
import { MovieGridLoading } from "./shared/MovieGridLoading";

interface WatchedTabProps {
  userId: number;
}

export function WatchedTab({ userId }: WatchedTabProps) {
  const { data, isLoading } = useUserWatched(userId);

  if (isLoading) return <MovieGridLoading />;
  if (!data?.movies?.length)
    return <EmptyState message="Просмотренных фильмов пока нет." />;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {data.movies.map((movie) => (
        <div key={movie.id} className="relative">
          <MovieCard
            movie={{
              overview: null,
              backdrop_path: null,
              genres: [],
              ...movie,
              tmdb_id: movie.tmdb_id ?? movie.id,
            }}
          />
          {movie.myScore && (
            <div className="absolute top-2 left-2 flex items-center gap-0.5 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-bold text-white">
              ★ {movie.myScore}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
