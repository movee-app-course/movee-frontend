"use client";

import { useState } from "react";
import { StarIcon, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteRating, useRateMovie } from "@/hooks/use-reviews";

interface ReviewFormProps {
  movieId: number;
  initialScore?: number;
  initialText?: string;
  initialSpoilers?: boolean;
}

export function ReviewForm({
  movieId,
  initialScore,
  initialText,
  initialSpoilers,
}: ReviewFormProps) {
  const [score, setScore] = useState<number | undefined>(initialScore);
  const [hoverScore, setHoverScore] = useState<number | undefined>();
  const [text, setText] = useState(initialText || "");
  const [hasSpoilers, setHasSpoilers] = useState(initialSpoilers || false);

  const rateMutation = useRateMovie(movieId);
  const deleteMutation = useDeleteRating(movieId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!score) return;
    rateMutation.mutate({ score, text, hasSpoilers });
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate();
    setScore(undefined);
    setText("");
    setHasSpoilers(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card space-y-4 rounded-lg border p-4"
    >
      <h3 className="text-lg font-semibold">
        {initialScore ? "Обновить отзыв" : "Оценить фильм"}
      </h3>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span className="text-xl font-bold sm:order-2 sm:ml-2 sm:text-lg">
          {hoverScore ?? score ?? 0}/10
        </span>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setScore(val)}
              onMouseEnter={() => setHoverScore(val)}
              onMouseLeave={() => setHoverScore(undefined)}
              className="cursor-pointer focus:outline-none"
            >
              <StarIcon
                className={`h-6 w-6 transition-all hover:scale-115 ${
                  score && score >= val
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground hover:text-yellow-200"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">Отзыв (необязательно)</Label>
        <Textarea
          id="review"
          placeholder="Что вы думаете о фильме?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          disabled={!score}
        />
        {!score && (
          <p className="text-muted-foreground text-xs">
            Сначала выберите оценку, чтобы написать отзыв.
          </p>
        )}
      </div>

      {text.length > 0 && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="spoilers"
            checked={hasSpoilers}
            onCheckedChange={(checked) => setHasSpoilers(checked as boolean)}
          />
          <Label
            htmlFor="spoilers"
            className="cursor-pointer text-sm font-normal"
          >
            Этот отзыв содержит спойлеры
          </Label>
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={!score || rateMutation.isPending}>
          {rateMutation.isPending ? "Сохранение..." : "Сохранить"}
        </Button>

        {initialScore && (
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  type="button"
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                />
              }
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              Удалить
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить отзыв?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это навсегда удалит вашу оценку и отзыв на этот фильм.
                  Действие нельзя отменить.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleConfirmDelete}
                >
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {rateMutation.isError && (
        <p className="text-sm text-red-500">Не удалось сохранить отзыв.</p>
      )}
    </form>
  );
}
