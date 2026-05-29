import { useUserWatched } from '@/hooks/use-social';
import { MovieCard } from '@/components/movie/MovieCard';
import { MovieGridLoading } from './shared/MovieGridLoading';
import { EmptyState } from './shared/EmptyState';

interface WatchedTabProps {
  userId: number;
}

export function WatchedTab({ userId }: WatchedTabProps) {
  const { data, isLoading } = useUserWatched(userId);

  if (isLoading) return <MovieGridLoading />;
  if (!data?.movies?.length) return <EmptyState message="Просмотренных фильмов пока нет." />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.movies.map(movie => (
        <div key={movie.id} className="relative">
          <MovieCard movie={{ overview: null, backdrop_path: null, genres: [], ...movie, tmdb_id: movie.tmdb_id ?? movie.id }} />
          {movie.myScore && (
            <div className="absolute top-2 left-2 bg-black/75 text-white text-xs font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
              ★ {movie.myScore}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
