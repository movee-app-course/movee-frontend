import { useUserReviews } from '@/hooks/use-social';
import { ReviewCard } from '@/components/review/ReviewCard';
import { TabLoading } from './shared/TabLoading';
import { EmptyState } from './shared/EmptyState';

interface ReviewsTabProps {
  userId: number;
}

export function ReviewsTab({ userId }: ReviewsTabProps) {
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
