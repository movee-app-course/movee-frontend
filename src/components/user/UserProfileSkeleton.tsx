import { Skeleton } from '@/components/ui/skeleton';

export function UserProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in-up">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <Skeleton className="w-32 h-32 rounded-full shrink-0" />
        <div className="flex-1 space-y-3 w-full text-center md:text-left">
          <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
          <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
          <Skeleton className="h-16 w-full max-w-md" />
          <div className="flex gap-6 justify-center md:justify-start pt-2">
            {[1, 2, 3, 4].map(i => (
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
