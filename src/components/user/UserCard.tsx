import Link from 'next/link';
import { UserAvatar } from './UserAvatar';
import { FollowButton } from './FollowButton';

interface UserCardProps {
  user: {
    id: number;
    username: string;
    displayName: string;
    avatarUrl?: string | null;
    bio?: string | null;
    isFollowing?: boolean;
  };
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-xl bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-200">
      <Link href={`/user/${user.id}`} className="flex items-center gap-3 flex-1 min-w-0 group">
        <UserAvatar avatarUrl={user.avatarUrl} username={user.username} className="h-11 w-11 shrink-0 ring-2 ring-transparent group-hover:ring-primary/20 transition-all" />
        <div className="flex flex-col min-w-0">
          <span className="font-semibold leading-tight truncate group-hover:text-primary transition-colors">
            {user.displayName}
          </span>
          <span className="text-sm text-muted-foreground truncate">@{user.username}</span>
          {user.bio && (
            <span className="text-xs text-muted-foreground line-clamp-1 mt-0.5 hidden sm:block">{user.bio}</span>
          )}
        </div>
      </Link>

      {user.isFollowing !== undefined && (
        <div className="ml-3 shrink-0">
          <FollowButton userId={user.id} isFollowing={user.isFollowing} />
        </div>
      )}
    </div>
  );
}
