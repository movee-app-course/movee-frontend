"use client";

import { UseMutationResult } from "@tanstack/react-query";
import {
  BookmarkCheckIcon,
  BookmarkIcon,
  CheckCircleIcon,
  EyeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { MovieStats } from "@/types";

interface MovieActionsCardProps {
  stats: MovieStats | undefined;
  watchlistMutation: UseMutationResult<void, Error, "add" | "remove">;
  watchedMutation: UseMutationResult<void, Error, "add" | "remove">;
}

export function MovieActionsCard({
  stats,
  watchlistMutation,
  watchedMutation,
}: MovieActionsCardProps) {
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <Button
          variant={stats?.inWatchlist ? "secondary" : "outline"}
          className="w-full justify-start gap-2 transition-all"
          onClick={() =>
            watchlistMutation.mutate(stats?.inWatchlist ? "remove" : "add")
          }
          disabled={watchlistMutation.isPending}
        >
          {stats?.inWatchlist ? (
            <BookmarkCheckIcon className="text-primary h-4 w-4" />
          ) : (
            <BookmarkIcon className="h-4 w-4" />
          )}
          {stats?.inWatchlist
            ? "В списке желаний"
            : "Добавить в список желаний"}
        </Button>

        <Button
          variant={stats?.isWatched ? "secondary" : "outline"}
          className="w-full justify-start gap-2 transition-all"
          onClick={() =>
            watchedMutation.mutate(stats?.isWatched ? "remove" : "add")
          }
          disabled={watchedMutation.isPending}
        >
          {stats?.isWatched ? (
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
          {stats?.isWatched ? "Просмотрено" : "Отметить как просмотренное"}
        </Button>
      </CardContent>
    </Card>
  );
}
