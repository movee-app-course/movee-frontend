import { Skeleton } from "@/components/ui/skeleton";
import { UserCard } from "@/components/user/UserCard";
import { useFollowing } from "@/hooks/use-social";
import { EmptyState } from "./shared/EmptyState";

interface FollowingTabProps {
  userId: number;
}

function FollowingLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border p-4">
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

export function FollowingTab({ userId }: FollowingTabProps) {
  const { data, isLoading } = useFollowing(userId);

  if (isLoading) return <FollowingLoading />;
  if (!data?.users?.length) return <EmptyState message="Нет подписок." />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data.users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
