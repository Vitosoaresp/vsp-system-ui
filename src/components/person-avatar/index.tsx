import { Avatar, AvatarFallback } from '../ui/avatar';

interface Props {
  name: string;
  email?: string;
}

export const PersonAvatar = ({ name, email }: Props) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <Avatar className="rounded-md">
        <AvatarFallback className="rounded-md">
          {name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 items-start">
        <p className="text-foreground">{name}</p>
        {email && <p className="text-foreground/80 text-xs">{email}</p>}
      </div>
    </div>
  );
};
