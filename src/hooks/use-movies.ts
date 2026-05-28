import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';
import { endpoints } from '../lib/api/endpoints';
import type { Movie, MovieStats } from '../types';
import type { RawMovieSearchResponse } from '../types/api-responses';

// The backend returns raw database rows with snake_case.
// We use the camelCase Movie interface defined in architecture.

export const useMovieSearch = (query: string) => {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: async () => {
      if (!query) return [];
      const res = await apiClient.get<RawMovieSearchResponse>(endpoints.movies.search(query));
      return res.data.results;
    },
    enabled: !!query,
  });
};

export const useMovie = (id: number, initialData?: Movie) => {
  return useQuery({
    queryKey: ['movies', id],
    queryFn: async () => {
      const res = await apiClient.get<Movie>(endpoints.movies.byId(id));
      return res.data;
    },
    enabled: !!id,
    initialData,
  });
};

export const useMovieStats = (id: number) => {
  return useQuery({
    queryKey: ['movies', id, 'stats'],
    queryFn: async () => {
      const res = await apiClient.get<MovieStats>(endpoints.movies.stats(id));
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
        await apiClient.post(endpoints.movies.watchlist(id));
      } else {
        await apiClient.delete(endpoints.movies.watchlist(id));
      }
    },
    onMutate: async (action) => {
      await queryClient.cancelQueries({ queryKey: ['movies', id, 'stats'] });
      const previous = queryClient.getQueryData<MovieStats>(['movies', id, 'stats']);
      queryClient.setQueryData<MovieStats>(['movies', id, 'stats'], (old) => {
        if (!old) return old;
        return { ...old, inWatchlist: action === 'add' };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['movies', id, 'stats'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['movies', id, 'stats'] });
    },
  });
};

export const useWatchedMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (action: 'add' | 'remove') => {
      if (action === 'add') {
        await apiClient.post(endpoints.movies.watched(id));
      } else {
        await apiClient.delete(endpoints.movies.watched(id));
      }
    },
    onMutate: async (action) => {
      await queryClient.cancelQueries({ queryKey: ['movies', id, 'stats'] });
      const previous = queryClient.getQueryData<MovieStats>(['movies', id, 'stats']);
      queryClient.setQueryData<MovieStats>(['movies', id, 'stats'], (old) => {
        if (!old) return old;
        return { ...old, isWatched: action === 'add' };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['movies', id, 'stats'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['movies', id, 'stats'] });
    },
  });
};
