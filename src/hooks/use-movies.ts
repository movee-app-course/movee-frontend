import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';
import { Movie, MovieStats } from '../types';

// The backend returns raw database rows with snake_case.
// We map it to the camelCase Movie interface defined in architecture.
const mapMovie = (data: any): Movie => ({
  id: data.id,
  tmdbId: data.tmdb_id,
  title: data.title,
  originalTitle: data.original_title,
  overview: data.overview,
  posterPath: data.poster_path,
  backdropPath: data.backdrop_path,
  releaseDate: data.release_date,
  genres: data.genres || [],
  voteAverage: data.vote_average ? parseFloat(data.vote_average) : null,
});

export const useMovieSearch = (query: string) => {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: async () => {
      if (!query) return [];
      const res = await apiClient.get<{ results: any[] }>('/movies/search', {
        params: { q: query },
      });
      return res.data.results.map(mapMovie);
    },
    enabled: !!query,
  });
};

export const useMovie = (id: number, initialData?: Movie) => {
  return useQuery({
    queryKey: ['movies', id],
    queryFn: async () => {
      const res = await apiClient.get<any>(`/movies/${id}`);
      return mapMovie(res.data);
    },
    enabled: !!id,
    initialData,
  });
};

export const useMovieStats = (id: number) => {
  return useQuery({
    queryKey: ['movies', id, 'stats'],
    queryFn: async () => {
      const res = await apiClient.get<MovieStats>(`/movies/${id}/stats`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useWatchlistMutation = (id: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (action: 'add' | 'remove') => {
      if (action === 'add') {
        await apiClient.post(`/movies/${id}/watchlist`);
      } else {
        await apiClient.delete(`/movies/${id}/watchlist`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies', id, 'stats'] });
    },
  });
};

export const useWatchedMutation = (id: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (action: 'add' | 'remove') => {
      if (action === 'add') {
        await apiClient.post(`/movies/${id}/watched`);
      } else {
        await apiClient.delete(`/movies/${id}/watched`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies', id, 'stats'] });
    },
  });
};
