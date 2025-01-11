import { cn } from '@/lib/utils';
import { User } from '@/types/user';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

export const UserAvatar = ({
  user,
  loading = false,
}: {
  user?: User;
  loading?: boolean;
}) => {
  return (
    <>
      <Avatar className="size-8 rounded-lg">
        <AvatarFallback className="rounded-lg">
          {user?.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className={cn('flex flex-col', !open && 'hidden')}>
        {loading && (
          <>
            <Skeleton className="w-full min-w-32 h-4 mb-1" />
            <Skeleton className="w-full min-w-32 h-4" />
          </>
        )}
        {!loading && (
          <>
            <span className="text-sm font-semibold text-foreground">
              {user?.name}
            </span>
            <span className="text-xs text-foreground/90">{user?.email}</span>
          </>
        )}
      </div>
    </>
  );
};
