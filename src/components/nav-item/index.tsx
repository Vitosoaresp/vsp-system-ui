import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItemProps {
	Icon: LucideIcon;
	label: string;
	to: string;
}

export const NavItem = ({ Icon, label, to }: NavItemProps) => {
	const location = useLocation();

	return (
		<Link
			className={clsx(
				'transition-all duration-75 text-base py-2 px-4 rounded-md whitespace-nowrap inline-flex justify-start items-center h-11 text-zinc-50',
				location.pathname === to
					? 'bg-zinc-800 hover:bg-zinc-800'
					: 'hover:bg-zinc-900',
			)}
			to={to}
		>
			<Icon className='mr-3' />
			{label}
		</Link>
	);
};
