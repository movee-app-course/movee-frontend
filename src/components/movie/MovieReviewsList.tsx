"use client";

import { ReviewCard } from "@/components/review/ReviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Review } from "@/types";

interface MovieReviewsListProps {
  reviews: Review[] | undefined;
  isLoading: boolean;
}

export function MovieReviewsList({
  reviews,
  isLoading,
}: MovieReviewsListProps) {
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">
        Отзывы
        {reviews && reviews.length > 0 && (
          <span className="text-muted-foreground ml-2 text-base font-normal">
            ({reviews.length})
          </span>
        )}
      </h3>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 rounded-xl border p-4">
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
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showMovie={false} />
          ))}
        </div>
      ) : (
        <div className="bg-card/50 rounded-xl border px-4 py-10 text-center">
          <p className="text-muted-foreground text-sm">
            Отзывов пока нет. Будьте первым!
          </p>
        </div>
      )}
    </div>
  );
}
