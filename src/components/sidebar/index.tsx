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
		<aside className="h-screen border-r border-r-zinc-800 md:w-52 py-5 w-20">
			<div className="flex gap-3 items-center mb-10">
				<Building2 size={32} className="text-zinc-50" />
				<div className="h-6 w-px bg-zinc-500" />
				<h1 className="text-zinc-50 font-semibold">VSP System</h1>
			</div>

			<nav className="flex flex-col pr-4 gap-2">
				{navItems.map(item => (
					<NavItem key={item.to} {...item} />
				))}
			</nav>
		</aside>
	);
};
