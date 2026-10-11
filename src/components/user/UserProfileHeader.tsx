"use client";

import { UserProfile } from "@/hooks/use-social";
import { useAuthStore } from "@/stores/auth-store";
import { FollowButton } from "./FollowButton";
import { UserAvatar } from "./UserAvatar";

type Tab = "reviews" | "watchlist" | "watched" | "followers" | "following";

interface UserProfileHeaderProps {
  user: UserProfile;
  isOwnProfile: boolean;
  onStatClick: (tab: Tab) => void;
}

export function UserProfileHeader({
  user,
  isOwnProfile,
  onStatClick,
}: UserProfileHeaderProps) {
  const { _hasHydrated } = useAuthStore();

  return (
    <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
      <UserAvatar
        avatarUrl={user.avatarUrl}
        username={user.username}
        className="h-28 w-28 shrink-0 text-3xl"
      />

      <div className="flex-1 space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-bold">{user.displayName}</h1>
        <p className="text-muted-foreground">@{user.username}</p>
        {user.bio && (
          <p className="text-foreground/80 max-w-lg text-sm">{user.bio}</p>
        )}

        <div className="flex flex-wrap justify-center gap-6 pt-3 md:justify-start">
          <button
            className="group cursor-pointer text-center"
            onClick={() => onStatClick("reviews")}
          >
            <span className="group-hover:text-primary text-lg font-bold transition-colors">
              {user.stats.reviewsCount}
            </span>
            <p className="text-muted-foreground text-xs">Отзывы</p>
          </button>
          <button
            className="group cursor-pointer text-center"
            onClick={() => onStatClick("watched")}
          >
            <span className="group-hover:text-primary text-lg font-bold transition-colors">
              {user.stats.watchedCount}
            </span>
            <p className="text-muted-foreground text-xs">Просмотрено</p>
          </button>
          <button
            className="group cursor-pointer text-center"
            onClick={() => onStatClick("followers")}
          >
            <span className="group-hover:text-primary text-lg font-bold transition-colors">
              {user.stats.followersCount}
            </span>
            <p className="text-muted-foreground text-xs">Подписчики</p>
          </button>
          <button
            className="group cursor-pointer text-center"
            onClick={() => onStatClick("following")}
          >
            <span className="group-hover:text-primary text-lg font-bold transition-colors">
              {user.stats.followingCount}
            </span>
            <p className="text-muted-foreground text-xs">Подписки</p>
          </button>
        </div>
      </div>

      {_hasHydrated && !isOwnProfile && (
        <div className="mt-4 md:mt-0">
          <FollowButton
            userId={user.id}
            isFollowing={user.isFollowing}
            className="w-full md:w-auto"
          />
        </div>
      )}
    </div>
  );
}
