import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileSkeleton() {
  return (
    <div className="animate-in-up container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
        <Skeleton className="h-32 w-32 shrink-0 rounded-full" />
        <div className="w-full flex-1 space-y-3 text-center md:text-left">
          <Skeleton className="mx-auto h-8 w-48 md:mx-0" />
          <Skeleton className="mx-auto h-4 w-32 md:mx-0" />
          <Skeleton className="h-16 w-full max-w-md" />
          <div className="flex justify-center gap-6 pt-2 md:justify-start">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-5 w-8" />
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
