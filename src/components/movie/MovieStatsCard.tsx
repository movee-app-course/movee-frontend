'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth-store';
import type { MovieStats } from '@/types';

interface MovieStatsCardProps {
  stats: MovieStats | undefined;
  isLoading: boolean;
}

export function MovieStatsCard({ stats, isLoading }: MovieStatsCardProps) {
  const { user, _hasHydrated } = useAuthStore();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-3 w-16" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Статистика</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Средняя оценка</p>
          <p className="text-3xl font-bold">
            {stats.averageScore ? stats.averageScore : '—'}
            {stats.averageScore && <span className="text-base font-normal text-muted-foreground">/10</span>}
          </p>
          <p className="text-xs text-muted-foreground">{stats.totalRatings} оценок</p>
        </div>

        {_hasHydrated && user && (stats.friendsWatched > 0 || stats.friendsAverageScore) && (
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Оценка друзей</p>
            <p className="text-3xl font-bold">
              {stats.friendsAverageScore ? stats.friendsAverageScore : '—'}
              {stats.friendsAverageScore && <span className="text-base font-normal text-muted-foreground">/10</span>}
            </p>
            <p className="text-xs text-muted-foreground">{stats.friendsWatched} друзей посмотрело</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
