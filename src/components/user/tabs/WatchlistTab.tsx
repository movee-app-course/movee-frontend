import { useUserWatchlist } from '@/hooks/use-social';
import { MovieCard } from '@/components/movie/MovieCard';
import { MovieGridLoading } from './shared/MovieGridLoading';
import { EmptyState } from './shared/EmptyState';

interface WatchlistTabProps {
  userId: number;
}

export function WatchlistTab({ userId }: WatchlistTabProps) {
  const { data, isLoading } = useUserWatchlist(userId);

  if (isLoading) return <MovieGridLoading />;
  if (!data?.movies?.length) return <EmptyState message="Watchlist is empty." />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={{ overview: null, backdrop_path: null, genres: [], ...movie, tmdb_id: movie.tmdb_id ?? movie.id }}
        />
      ))}
    </div>
  );
}
