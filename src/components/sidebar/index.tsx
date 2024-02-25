import {
	Building2,
	Factory,
	LayoutDashboard,
	Package,
	UserRoundCog,
	Users,
} from 'lucide-react';
import { NavItem, NavItemProps } from '../nav-item';

const navItems: NavItemProps[] = [
	{ label: 'Dashboard', to: '/', Icon: LayoutDashboard },
	{ label: 'Produtos', to: '/products', Icon: Package },
	{ label: 'Clientes', to: '/customers', Icon: Users },
	{ label: 'Fornecedores', to: '/suppliers', Icon: Factory },
	{ label: 'Usuarios', to: '/users', Icon: UserRoundCog },
];

export const Sidebar = () => {
	return (
		<aside className="h-full md:w-52 py-5 w-20 pr-2">
			<div className="flex md:gap-3 items-center mb-10 md:flex-row flex-col">
				<Building2 className="text-zinc-50 h-8 w-8" />
				<div className="h-6 w-px bg-zinc-500 hidden md:block" />
				<h1 className="text-zinc-50 font-semibold md:text-left text-center">
					VSP System
				</h1>
			</div>

			<nav className="flex flex-col pr-4 gap-2">
				{navItems.map(item => (
					<NavItem key={item.to} {...item} />
				))}
			</nav>
		</aside>
	);
};
