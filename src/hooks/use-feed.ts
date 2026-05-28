import apiClient from "@/lib/api-client";
import { endpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/stores/auth-store";
import { FeedItem } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// API response matches { feed: FeedItem[], nextCursor: number | null }
// So we need a custom interface for the response to map it to CursorPaginatedResponse or use it directly
interface FeedApiResponse {
  feed: FeedItem[];
  nextCursor: number | null;
}

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ["feed", "general"],
    queryFn: async ({ pageParam = null as number | null }) => {
      const res = await apiClient.get<FeedApiResponse>(endpoints.feed.general, {
        params: { cursor: pageParam, limit: 20 },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as number | null,
  });
}

export function usePersonalFeed() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useInfiniteQuery({
    queryKey: ["feed", "personal"],
    queryFn: async ({ pageParam = null as number | null }) => {
      const res = await apiClient.get<FeedApiResponse>(
        endpoints.feed.personal,
        {
          params: { cursor: pageParam, limit: 20 },
        },
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as number | null,
    enabled: isAuthenticated,
  });
}

export interface PopularMovieStats {
  id: number;
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  ratingCount: number;
  averageScore: number;
}

export function usePopularFeed() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ["feed", "popular"],
    queryFn: async () => {
      const res = await apiClient.get<PopularMovieStats[]>(
        endpoints.feed.popular,
      );
      return res.data;
    },
    enabled: isAuthenticated,
  });
}
