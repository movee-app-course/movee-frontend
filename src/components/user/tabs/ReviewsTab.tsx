import { ReviewCard } from "@/components/review/ReviewCard";
import { useUserReviews } from "@/hooks/use-social";
import { EmptyState } from "./shared/EmptyState";
import { TabLoading } from "./shared/TabLoading";

interface ReviewsTabProps {
  userId: number;
}

export function ReviewsTab({ userId }: ReviewsTabProps) {
  const { data, isLoading } = useUserReviews(userId);

  if (isLoading) return <TabLoading />;
  if (!data?.data?.length) return <EmptyState message="Отзывов ещё нет." />;

  return (
    <div className="space-y-4">
      {data.data.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
