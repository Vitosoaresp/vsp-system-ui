import { LucideIcon } from 'lucide-react';

interface HeaderProps {
  title: string;
  Icon: LucideIcon;
}

export const Header = ({ title, Icon }: HeaderProps) => {
  return (
    <header className="border-b border-zinc-800">
      <div className="container flex justify-between w-full py-8 items-center">
        <h4 className="text-zinc-50 text-xl font-bold uppercase flex gap-2">
          <Icon />
          {title}
        </h4>
      </div>
    </header>
  );
};
