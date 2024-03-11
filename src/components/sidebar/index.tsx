import {
	Building2,
	Coins,
	Factory,
	HandCoins,
	Landmark,
	LayoutDashboard,
	Package,
	ShoppingCart,
	UserRoundCog,
	Users,
	Wallet,
} from 'lucide-react';
import { NavCollapsibleItem } from '../nav-collapsible-item';
import { NavItem, NavItemProps } from '../nav-item';

const navItems: NavItemProps[] = [
	{ label: 'Dashboard', to: '/', Icon: LayoutDashboard },
	{ label: 'Vendas', to: '/sales', Icon: ShoppingCart },
	{ label: 'Produtos', to: '/products', Icon: Package },
	{ label: 'Clientes', to: '/customers', Icon: Users },
	{ label: 'Fornecedores', to: '/suppliers', Icon: Factory },
	{ label: 'Usuarios', to: '/users', Icon: UserRoundCog },
];
const collapsibleItems: NavItemProps[] = [
	{ label: 'Caixa', to: '/cash', Icon: Landmark },
	{ label: 'Contas a Pagar', to: '/payables', Icon: Coins },
	{ label: 'Contas a Receber', to: '/receivables', Icon: HandCoins },
];

export const Sidebar = () => {
	return (
		<aside className="fixed left-0 top-0 h-full md:w-64 p-5 md:p-10 w-20 pr-2 flex flex-col items-center box-border z-50 border-r border-r-zinc-800">
			<div className="flex md:gap-3 items-center mb-10 md:flex-row flex-col">
				<Building2 className="text-zinc-50 h-8 w-8 lg:h-10 lg:w-10" />
				<div className="h-6 w-px bg-zinc-500 hidden md:block" />
				<h1 className="text-zinc-50 font-semibold md:text-left text-center text-base lg:text-lg">
					VSP System
				</h1>
			</div>

			<nav className="flex flex-col pr-4 gap-2">
				{navItems.map(item => (
					<NavItem key={item.to} {...item} />
				))}
				<NavCollapsibleItem
					items={collapsibleItems}
					Icon={Wallet}
					label="Finanças"
				/>
			</nav>
		</aside>
	);
};
