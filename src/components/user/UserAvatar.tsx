import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  avatarUrl?: string | null;
  username: string;
  className?: string;
}

export function UserAvatar({ avatarUrl, username, className }: UserAvatarProps) {
  const fallback = username.substring(0, 2).toUpperCase();
  
  return (
    <Avatar className={cn("h-10 w-10 border bg-muted", className)}>
      <AvatarImage src={avatarUrl || undefined} alt={username} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
