import { Skeleton } from '@/components/ui/skeleton';
import { useFollowers } from '@/hooks/use-social';
import { UserCard } from '@/components/user/UserCard';
import { EmptyState } from './shared/EmptyState';

interface FollowersTabProps {
  userId: number;
}

function FollowersLoading() {
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

export function FollowersTab({ userId }: FollowersTabProps) {
  const { data, isLoading } = useFollowers(userId);

  if (isLoading) return <FollowersLoading />;
  if (!data?.users?.length) return <EmptyState message="No followers yet." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
