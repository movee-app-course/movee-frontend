'use client';

import { Button } from '@/components/ui/button';
import { useFollowMutation, useUnfollowMutation } from '@/hooks/use-social';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

interface FollowButtonProps {
  userId: number;
  isFollowing: boolean;
  className?: string;
}

export function FollowButton({ userId, isFollowing, className }: FollowButtonProps) {
  const currentUser = useAuthStore(state => state.user);
  const router = useRouter();
  
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
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
