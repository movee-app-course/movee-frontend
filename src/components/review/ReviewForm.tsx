'use client';

import { useState } from 'react';
import { useRateMovie, useDeleteRating } from '@/hooks/use-reviews';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
} from '@/components/ui/alert-dialog';
import { StarIcon, Trash2Icon } from 'lucide-react';

interface ReviewFormProps {
  movieId: number;
  initialScore?: number;
  initialText?: string;
  initialSpoilers?: boolean;
}

export function ReviewForm({ movieId, initialScore, initialText, initialSpoilers }: ReviewFormProps) {
  const [score, setScore] = useState<number | undefined>(initialScore);
  const [text, setText] = useState(initialText || '');
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
    setText('');
    setHasSpoilers(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card">
      <h3 className="font-semibold text-lg">{initialScore ? 'Обновить отзыв' : 'Оценить фильм'}</h3>

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setScore(val)}
            className="focus:outline-none"
          >
            <StarIcon
              className={`w-6 h-6 transition-colors ${score && score >= val ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground hover:text-yellow-200'}`}
            />
          </button>
        ))}
        {score && <span className="ml-2 font-bold text-lg">{score}/10</span>}
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
        {!score && <p className="text-xs text-muted-foreground">Сначала выберите оценку, чтобы написать отзыв.</p>}
      </div>

      {text.length > 0 && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="spoilers"
            checked={hasSpoilers}
            onCheckedChange={(checked) => setHasSpoilers(checked as boolean)}
          />
          <Label htmlFor="spoilers" className="text-sm font-normal cursor-pointer">
            Этот отзыв содержит спойлеры
          </Label>
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={!score || rateMutation.isPending}>
          {rateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
        </Button>

        {initialScore && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="destructive" disabled={deleteMutation.isPending}>
                <Trash2Icon className="w-4 h-4 mr-2" />
                Удалить
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить отзыв?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это навсегда удалит вашу оценку и отзыв на этот фильм. Действие нельзя отменить.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleConfirmDelete}>
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {rateMutation.isError && <p className="text-sm text-red-500">Не удалось сохранить отзыв.</p>}
    </form>
  );
}
