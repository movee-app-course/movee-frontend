'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ReviewCard } from '@/components/review/ReviewCard';
import type { Review } from '@/types';

interface MovieReviewsListProps {
  reviews: Review[] | undefined;
  isLoading: boolean;
}

export function MovieReviewsList({ reviews, isLoading }: MovieReviewsListProps) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">
        Reviews
        {reviews && reviews.length > 0 && (
          <span className="text-base font-normal text-muted-foreground ml-2">
            ({reviews.length})
          </span>
        )}
      </h3>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-xl space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-14 w-full" />
            </div>
          ))}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} showMovie={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-4 border rounded-xl bg-card/50">
          <p className="text-muted-foreground text-sm">
            No reviews yet. Be the first to review!
          </p>
        </div>
      )}
    </div>
  );
}
