'use client';

import { UserProfile } from '@/hooks/use-social';
import { UserAvatar } from './UserAvatar';
import { FollowButton } from './FollowButton';
import { useAuthStore } from '@/stores/auth-store';

type Tab = 'reviews' | 'watchlist' | 'watched' | 'followers' | 'following';

interface UserProfileHeaderProps {
  user: UserProfile;
  isOwnProfile: boolean;
  onStatClick: (tab: Tab) => void;
}

export function UserProfileHeader({ user, isOwnProfile, onStatClick }: UserProfileHeaderProps) {
  const { _hasHydrated } = useAuthStore();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
      <UserAvatar avatarUrl={user.avatarUrl} username={user.username} className="w-28 h-28 text-3xl shrink-0" />

      <div className="flex-1 text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold">{user.displayName}</h1>
        <p className="text-muted-foreground">@{user.username}</p>
        {user.bio && <p className="text-sm text-foreground/80 max-w-lg">{user.bio}</p>}

        <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-3">
          <button className="text-center group" onClick={() => onStatClick('reviews')}>
            <span className="font-bold text-lg group-hover:text-primary transition-colors">{user.stats.reviewsCount}</span>
            <p className="text-xs text-muted-foreground">Отзывы</p>
          </button>
          <button className="text-center group" onClick={() => onStatClick('watched')}>
            <span className="font-bold text-lg group-hover:text-primary transition-colors">{user.stats.watchedCount}</span>
            <p className="text-xs text-muted-foreground">Просмотрено</p>
          </button>
          <button className="text-center group" onClick={() => onStatClick('followers')}>
            <span className="font-bold text-lg group-hover:text-primary transition-colors">{user.stats.followersCount}</span>
            <p className="text-xs text-muted-foreground">Подписчики</p>
          </button>
          <button className="text-center group" onClick={() => onStatClick('following')}>
            <span className="font-bold text-lg group-hover:text-primary transition-colors">{user.stats.followingCount}</span>
            <p className="text-xs text-muted-foreground">Подписки</p>
          </button>
        </div>
      </div>

      {_hasHydrated && !isOwnProfile && (
        <div className="mt-4 md:mt-0">
          <FollowButton userId={user.id} isFollowing={user.isFollowing} className="w-full md:w-auto" />
        </div>
      )}
    </div>
  );
}
