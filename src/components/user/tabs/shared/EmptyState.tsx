import { FilmIcon } from "lucide-react";

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-muted-foreground bg-card/50 mt-15 flex flex-col items-center justify-center text-center">
      <div className="bg-muted mb-3 rounded-full p-4">
        <FilmIcon className="h-8 w-8 opacity-30" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}
