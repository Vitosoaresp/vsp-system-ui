import { cn } from '@/lib/utils';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { NavItem, NavItemProps } from '../nav-item';

interface NavCollapsibleItemProps {
	items: NavItemProps[];
	label: string;
	Icon: LucideIcon;
}

export const NavCollapsibleItem = ({
	items,
	label,
	Icon,
}: NavCollapsibleItemProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleToggle = () => setOpen(!open);

	return (
		<div className="">
			<div className="hover:bg-zinc-900 w-full h-11 py-2 px-4 rounded-md mb-2">
				<button
					className="relative w-full items-center whitespace-nowrap inline-flex md:justify-start justify-center text-zinc-50 text-base font-medium lg:text-lg transition-all duration-75"
					onClick={handleToggle}
				>
					<Icon className="md:mr-3" />
					<span className="hidden md:inline">{label}</span>
					<span
						className={cn(
							'absolute top-1/2 -translate-y-1/2 right-0 text-xs text-white rounded-full w-6 h-6 flex justify-center items-center transition-all duration-300',
							open ? 'rotate-180' : 'rotate-0',
						)}
					>
						<ChevronDown />
					</span>
				</button>
			</div>
			<div
				className={cn(
					'overflow-hidden transition-all duration-300',
					open ? 'h-40' : 'h-0',
				)}
			>
				<div className="flex flex-col gap-2">
					{items.map(item => (
						<NavItem key={item.to} {...item} />
					))}
				</div>
			</div>
		</div>
	);
};
