import { useMe } from '@/hooks';
import { AvatarMenu } from '../avatar-menu';

interface HeaderProps {
	title: string;
}

export const Header = ({ title }: HeaderProps) => {
	const me = useMe();

	return (
		<header className="flex justify-between w-full px-4 py-8 items-center border-b border-zinc-800">
			<div className="md:ml-10">
				<h1 className="text-zinc-50 text-xl font-bold uppercase">{title}</h1>
			</div>
			<AvatarMenu user={me} />
		</header>
	);
};
