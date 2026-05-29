'use client';

import { Button } from '@/components/ui/button';
import { useFollowMutation, useUnfollowMutation, useUserProfile, type UserProfile } from '@/hooks/use-social';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

interface FollowButtonProps {
  userId: number;
  /** Pass the current isFollowing value from the parent as initial data. */
  isFollowing: boolean;
  className?: string;
}

export function FollowButton({ userId, isFollowing: isFollowingProp, className }: FollowButtonProps) {
  const currentUser = useAuthStore(state => state.user);
  const router = useRouter();

  // Read from cache so optimistic updates propagate immediately.
  // Fall back to the prop (initialData) when the cache entry doesn't exist yet.
  const initialData: UserProfile | undefined = undefined; // avoid circular dependency
  const { data: profile } = useUserProfile(userId, initialData);
  const isFollowing = profile?.isFollowing ?? isFollowingProp;

  const followMutation = useFollowMutation(userId);
  const unfollowMutation = useUnfollowMutation(userId);

  // You can't follow yourself
  if (currentUser && currentUser.id === userId) {
    return null;
  }

  const isLoading = followMutation.isPending || unfollowMutation.isPending;

  const handleToggleFollow = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return (
    <Button
      variant={isFollowing ? 'secondary' : 'default'}
      size="sm"
      onClick={handleToggleFollow}
      disabled={isLoading}
      className={className}
    >
      {isFollowing ? 'Подписан' : 'Подписаться'}
    </Button>
  );
}
