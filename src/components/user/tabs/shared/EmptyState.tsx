import { FilmIcon } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground border rounded-xl bg-card/50">
      <div className="rounded-full bg-muted p-4 mb-3">
        <FilmIcon className="w-8 h-8 opacity-30" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}
