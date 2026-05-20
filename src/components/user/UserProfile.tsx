'use client';

import { useState } from 'react';
import {
  UserProfile as UserProfileData,
  useUserProfile,
  useUserReviews,
  useUserWatchlist,
  useUserWatched,
  useFollowers,
  useFollowing
} from '@/hooks/use-social';
import { UserAvatar } from './UserAvatar';
import { FollowButton } from './FollowButton';
import { UserCard } from './UserCard';
import { useAuthStore } from '@/stores/auth-store';
import { ReviewCard } from '@/components/review/ReviewCard';
import { Skeleton } from '@/components/ui/skeleton';
import { MovieCard } from '@/components/movie/MovieCard';
import Link from 'next/link';
import { FilmIcon, BookmarkIcon, EyeIcon, UsersIcon, UserCheckIcon, MessageSquareIcon } from 'lucide-react';

type Tab = 'reviews' | 'watchlist' | 'watched' | 'followers' | 'following';

interface UserProfileProps {
  userId: number;
  isOwnProfile?: boolean;
  initialData?: UserProfileData | null;
}

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'reviews', label: 'Reviews', icon: <MessageSquareIcon className="w-4 h-4" /> },
  { key: 'watchlist', label: 'Watchlist', icon: <BookmarkIcon className="w-4 h-4" /> },
  { key: 'watched', label: 'Watched', icon: <EyeIcon className="w-4 h-4" /> },
  { key: 'followers', label: 'Followers', icon: <UsersIcon className="w-4 h-4" /> },
  { key: 'following', label: 'Following', icon: <UserCheckIcon className="w-4 h-4" /> },
];

export function UserProfile({ userId, isOwnProfile = false, initialData }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('reviews');
  const { user: loggedInUser, _hasHydrated } = useAuthStore();
  const { data: user, isLoading: isUserLoading } = useUserProfile(userId, initialData || undefined);

  const actualIsOwnProfile = isOwnProfile || (loggedInUser !== null && loggedInUser.id === userId);

  if (isUserLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl animate-in-up">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <Skeleton className="w-32 h-32 rounded-full shrink-0" />
          <div className="flex-1 space-y-3 w-full text-center md:text-left">
            <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
            <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
            <Skeleton className="h-16 w-full max-w-md" />
            <div className="flex gap-6 justify-center md:justify-start pt-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-3 w-14" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="rounded-full bg-muted p-5 mb-4">
          <FilmIcon className="w-10 h-10 text-muted-foreground/50" />
        </div>
        <h1 className="text-2xl font-bold mb-2">User not found</h1>
        <p className="text-muted-foreground">This profile doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in-up">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <UserAvatar avatarUrl={user.avatarUrl} username={user.username} className="w-28 h-28 text-3xl shrink-0" />
        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold">{user.displayName}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
          {user.bio && <p className="text-sm text-foreground/80 max-w-lg">{user.bio}</p>}

          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-3">
            <button
              className="text-center group"
              onClick={() => setActiveTab('reviews')}
            >
              <span className="font-bold text-lg group-hover:text-primary transition-colors">{user.stats.reviewsCount}</span>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </button>
            <button
              className="text-center group"
              onClick={() => setActiveTab('watched')}
            >
              <span className="font-bold text-lg group-hover:text-primary transition-colors">{user.stats.watchedCount}</span>
              <p className="text-xs text-muted-foreground">Watched</p>
            </button>
            <button
              className="text-center group"
              onClick={() => setActiveTab('followers')}
            >
              <span className="font-bold text-lg group-hover:text-primary transition-colors">{user.stats.followersCount}</span>
              <p className="text-xs text-muted-foreground">Followers</p>
            </button>
            <button
              className="text-center group"
              onClick={() => setActiveTab('following')}
            >
              <span className="font-bold text-lg group-hover:text-primary transition-colors">{user.stats.followingCount}</span>
              <p className="text-xs text-muted-foreground">Following</p>
            </button>
          </div>
        </div>

        {_hasHydrated && !actualIsOwnProfile && (
          <div className="mt-4 md:mt-0">
            <FollowButton userId={user.id} isFollowing={user.isFollowing} className="w-full md:w-auto" />
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
        <div className="flex border-b gap-1 w-max min-w-full">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 font-medium text-sm whitespace-nowrap border-b-2 transition-colors -mb-px ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'reviews' && <ReviewsTab userId={userId} />}
        {activeTab === 'watchlist' && <WatchlistTab userId={userId} />}
        {activeTab === 'watched' && <WatchedTab userId={userId} />}
        {activeTab === 'followers' && <FollowersTab userId={userId} />}
        {activeTab === 'following' && <FollowingTab userId={userId} />}
      </div>
    </div>
  );
}

// --- Tab Components ---

function TabLoading({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 border rounded-xl space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-14 w-full" />
        </div>
      ))}
    </div>
  );
}

function MovieGridLoading() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-[2/3] w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground border rounded-xl bg-card/50">
      <div className="rounded-full bg-muted p-4 mb-3">
        <FilmIcon className="w-8 h-8 opacity-30" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}

function ReviewsTab({ userId }: { userId: number }) {
  const { data, isLoading } = useUserReviews(userId);

  if (isLoading) return <TabLoading />;
  if (!data?.data?.length) return <EmptyState message="No reviews yet." />;

  return (
    <div className="space-y-4">
      {data.data.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

function WatchlistTab({ userId }: { userId: number }) {
  const { data, isLoading } = useUserWatchlist(userId);

  if (isLoading) return <MovieGridLoading />;
  if (!data?.movies?.length) return <EmptyState message="Watchlist is empty." />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.movies.map(movie => (
        <MovieCard key={movie.id} movie={{ overview: null, backdropPath: null, genres: [], ...movie, tmdbId: movie.tmdbId ?? movie.id }} />
      ))}
    </div>
  );
}

function WatchedTab({ userId }: { userId: number }) {
  const { data, isLoading } = useUserWatched(userId);

  if (isLoading) return <MovieGridLoading />;
  if (!data?.movies?.length) return <EmptyState message="No watched movies yet." />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.movies.map(movie => (
        <div key={movie.id} className="relative">
          <MovieCard movie={{ overview: null, backdropPath: null, genres: [], ...movie, tmdbId: movie.tmdbId ?? movie.id }} />
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

function FollowersTab({ userId }: { userId: number }) {
  const { data, isLoading } = useFollowers(userId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-3 p-4 border rounded-xl">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (!data?.users?.length) return <EmptyState message="No followers yet." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

function FollowingTab({ userId }: { userId: number }) {
  const { data, isLoading } = useFollowing(userId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-3 p-4 border rounded-xl">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (!data?.users?.length) return <EmptyState message="Not following anyone yet." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
