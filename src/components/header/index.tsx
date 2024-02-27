import { useMe } from '@/hooks';
import { LucideIcon } from 'lucide-react';
import { AvatarMenu } from '../avatar-menu';

interface HeaderProps {
	title: string;
	Icon: LucideIcon;
}

export const Header = ({ title, Icon }: HeaderProps) => {
	const me = useMe();

	return (
		<header className="border-b border-zinc-800">
			<div className="container flex justify-between w-full py-8 items-center">
				<h1 className="text-zinc-50 text-xl font-bold uppercase flex gap-2">
					<Icon />
					{title}
				</h1>
				<AvatarMenu user={me} />
			</div>
		</header>
	);
};
