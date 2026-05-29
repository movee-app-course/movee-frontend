'use client';

import { BookmarkIcon, BookmarkCheckIcon, EyeIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { MovieStats } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';

interface MovieActionsCardProps {
  stats: MovieStats | undefined;
  watchlistMutation: UseMutationResult<void, Error, 'add' | 'remove'>;
  watchedMutation: UseMutationResult<void, Error, 'add' | 'remove'>;
}

export function MovieActionsCard({ stats, watchlistMutation, watchedMutation }: MovieActionsCardProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <Button
          variant={stats?.inWatchlist ? 'secondary' : 'outline'}
          className="w-full justify-start gap-2 transition-all"
          onClick={() => watchlistMutation.mutate(stats?.inWatchlist ? 'remove' : 'add')}
          disabled={watchlistMutation.isPending}
        >
          {stats?.inWatchlist
            ? <BookmarkCheckIcon className="w-4 h-4 text-primary" />
            : <BookmarkIcon className="w-4 h-4" />}
          {stats?.inWatchlist ? 'В списке желаний' : 'Добавить в список желаний'}
        </Button>

        <Button
          variant={stats?.isWatched ? 'secondary' : 'outline'}
          className="w-full justify-start gap-2 transition-all"
          onClick={() => watchedMutation.mutate(stats?.isWatched ? 'remove' : 'add')}
          disabled={watchedMutation.isPending}
        >
          {stats?.isWatched
            ? <CheckCircleIcon className="w-4 h-4 text-green-500" />
            : <EyeIcon className="w-4 h-4" />}
          {stats?.isWatched ? 'Просмотрено' : 'Отметить как просмотренное'}
        </Button>
      </CardContent>
    </Card>
  );
}
