import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { endpoints } from '@/lib/api/endpoints';
import { User, MovieStats, PaginatedResponse, Review, Movie } from '@/types';

// Extended user type from API with stats and following info
export interface UserProfile extends User {
  stats: {
    followersCount: number;
    followingCount: number;
    reviewsCount: number;
    watchedCount: number;
  };
  isFollowing: boolean;
}

export interface UserStatsMovie {
  id: number;
  tmdb_id: number;
  title: string;
  original_title: string | null;
  poster_path: string | null;
  release_date: string | null;
  vote_average: number | string | null;
}

export interface WatchlistMovie extends UserStatsMovie {
  addedAt: string;
}

export interface WatchedMovie extends UserStatsMovie {
  watchedAt: string;
  myScore: number | null;
}

export interface FollowUser extends User {
  isFollowing: boolean;
}

// ─── Queries ─────────────────────────────────────────────────────────────

export const useUserProfile = (userId: number, initialData?: UserProfile) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      const { data } = await apiClient.get<UserProfile>(endpoints.users.byId(userId));
      return data;
    },
    enabled: !!userId,
    initialData,
  });
};

export const useUserReviews = (userId: number, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['users', userId, 'reviews', page],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResponse<Review & { movie: Movie, user: User }>>(endpoints.users.reviews(userId), {
        params: { page, limit },
      });
      return data;
    },
    enabled: !!userId,
  });
};

export const useUserWatchlist = (userId: number, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['users', userId, 'watchlist', page],
    queryFn: async () => {
      const { data } = await apiClient.get<{ movies: WatchlistMovie[], total: number, page: number, limit: number }>(endpoints.users.watchlist(userId), {
        params: { page, limit },
      });
      return data;
    },
    enabled: !!userId,
  });
};

export const useUserWatched = (userId: number, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['users', userId, 'watched', page],
    queryFn: async () => {
      const { data } = await apiClient.get<{ movies: WatchedMovie[], total: number, page: number, limit: number }>(endpoints.users.watched(userId), {
        params: { page, limit },
      });
      return data;
    },
    enabled: !!userId,
  });
};

export const useFollowers = (userId: number, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['users', userId, 'followers', page],
    queryFn: async () => {
      const { data } = await apiClient.get<{ users: FollowUser[], total: number, page: number, limit: number }>(endpoints.users.followers(userId), {
        params: { page, limit },
      });
      return data;
    },
    enabled: !!userId,
  });
};

export const useFollowing = (userId: number, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['users', userId, 'following', page],
    queryFn: async () => {
      const { data } = await apiClient.get<{ users: FollowUser[], total: number, page: number, limit: number }>(endpoints.users.following(userId), {
        params: { page, limit },
      });
      return data;
    },
    enabled: !!userId,
  });
};

// ─── Mutations ───────────────────────────────────────────────────────────

export const useFollowMutation = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post(endpoints.users.follow(userId));
      return data;
    },
    onSuccess: () => {
      // Invalidate user profile to update stats
      queryClient.invalidateQueries({ queryKey: ['users', userId] });
      // Also could invalidate the logged-in user's following list, etc.
    },
  });
};

export const useUnfollowMutation = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.delete(endpoints.users.follow(userId));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', userId] });
    },
  });
};
