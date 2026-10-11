import { useEffect } from "react";
import { ReviewCard } from "@/components/review/ReviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "@/hooks/use-in-view";
import { FeedItem } from "@/types";

interface FeedListProps {
  data:
    | {
        pages: { feed: FeedItem[]; nextCursor: number | null }[];
      }
    | undefined;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export function FeedList({
  data,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: FeedListProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col space-y-3 rounded-xl border p-4"
          >
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const items = data?.pages.flatMap((page) => page.feed) || [];

  if (items.length === 0) {
    return (
      <div className="text-muted-foreground bg-card/50 flex flex-col items-center justify-center rounded-xl border px-4 py-12 text-center">
        <div className="bg-muted mb-4 rounded-full p-4">
          <svg
            className="text-muted-foreground/50 h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="mb-1 text-lg font-medium">Здесь тихо...</h3>
        <p className="mx-auto max-w-sm text-sm">
          Новых активностей пока нет. Подпишитесь на пользователей или напишите
          собственные отзывы, чтобы наполнить ленту!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <ReviewCard key={`${item.review.id}-${i}`} review={item.review} />
      ))}

      <div
        ref={ref}
        className="text-muted-foreground flex justify-center py-4 text-sm"
      >
        {isFetchingNextPage && (
          <div className="flex items-center space-x-2">
            <div className="bg-primary/40 h-2 w-2 animate-pulse rounded-full"></div>
            <div className="bg-primary/40 h-2 w-2 animate-pulse rounded-full delay-75"></div>
            <div className="bg-primary/40 h-2 w-2 animate-pulse rounded-full delay-150"></div>
          </div>
        )}
        {!hasNextPage && items.length > 0 && (
          <p className="opacity-60">— Вы дошли до конца —</p>
        )}
      </div>
    </div>
  );
}
