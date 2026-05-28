import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { endpoints } from '@/lib/api/endpoints';
import { Review, PaginatedResponse } from '@/types';

export const useMovieReviews = (movieId: number, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['movies', movieId, 'reviews', page, limit],
    queryFn: async () => {
      const res = await apiClient.get<{ reviews: Review[], total: number, page: number, limit: number }>(endpoints.movies.reviews(movieId), {
        params: { page, limit },
      });
      return res.data;
    },
    enabled: !!movieId,
  });
};

interface RatePayload {
  score: number;
  text?: string;
  hasSpoilers?: boolean;
}

export const useRateMovie = (movieId: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: RatePayload) => {
      await apiClient.post(endpoints.movies.rate(movieId), payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies', movieId, 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['movies', movieId, 'reviews'] });
    },
  });
};

export const useDeleteRating = (movieId: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await apiClient.delete(endpoints.movies.rate(movieId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies', movieId, 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['movies', movieId, 'reviews'] });
    },
  });
};
