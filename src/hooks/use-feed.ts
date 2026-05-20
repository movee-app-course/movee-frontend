import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { CursorPaginatedResponse, FeedItem, Movie } from '@/types';

// API response matches { feed: FeedItem[], nextCursor: number | null }
// So we need a custom interface for the response to map it to CursorPaginatedResponse or use it directly
interface FeedApiResponse {
  feed: FeedItem[];
  nextCursor: number | null;
}

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ['feed', 'general'],
    queryFn: async ({ pageParam = null as number | null }) => {
      const res = await apiClient.get<FeedApiResponse>('/feed', {
        params: { cursor: pageParam, limit: 20 },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as number | null,
  });
}

export function usePersonalFeed() {
  return useInfiniteQuery({
    queryKey: ['feed', 'personal'],
    queryFn: async ({ pageParam = null as number | null }) => {
      const res = await apiClient.get<FeedApiResponse>('/feed/personal', {
        params: { cursor: pageParam, limit: 20 },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as number | null,
  });
}

export interface PopularMovieStats {
  id: number;
  tmdbId: number;
  title: string;
  posterPath: string | null;
  ratingCount: number;
  averageScore: number;
}

export function usePopularFeed() {
  return useQuery({
    queryKey: ['feed', 'popular'],
    queryFn: async () => {
      const res = await apiClient.get<PopularMovieStats[]>('/feed/popular');
      return res.data;
    },
  });
}
