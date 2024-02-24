import {
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
		<aside className='h-[85vh] border-r border-r-zinc-800 w-52 py-5'>
			<nav className='flex flex-col pr-4 gap-2'>
				{navItems.map((item) => (
					<NavItem key={item.to} {...item} />
				))}
			</nav>
		</aside>
	);
};
