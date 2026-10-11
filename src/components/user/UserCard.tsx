import Link from "next/link";
import { FollowButton } from "./FollowButton";
import { UserAvatar } from "./UserAvatar";

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
    <div className="bg-card hover:border-primary/30 flex items-center justify-between rounded-xl border p-4 transition-all duration-200 hover:shadow-sm">
      <Link
        href={`/user/${user.id}`}
        className="group flex min-w-0 flex-1 items-center gap-3"
      >
        <UserAvatar
          avatarUrl={user.avatarUrl}
          username={user.username}
          className="group-hover:ring-primary/20 h-11 w-11 shrink-0 ring-2 ring-transparent transition-all"
        />
        <div className="flex min-w-0 flex-col">
          <span className="group-hover:text-primary truncate leading-tight font-semibold transition-colors">
            {user.displayName}
          </span>
          <span className="text-muted-foreground truncate text-sm">
            @{user.username}
          </span>
          {user.bio && (
            <span className="text-muted-foreground mt-0.5 line-clamp-1 hidden text-xs sm:block">
              {user.bio}
            </span>
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
