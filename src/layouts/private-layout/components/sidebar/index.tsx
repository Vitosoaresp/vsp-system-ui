import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarUi,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types/common';
import {
  Building2,
  Coins,
  Factory,
  HandCoins,
  Landmark,
  LayoutDashboard,
  Package,
  ShoppingBag,
  ShoppingCart,
  UserRoundCog,
  Users,
  Wallet,
} from 'lucide-react';
import { CollapsibleMenu } from './collapsible-menu';
import { SidebarFooter } from './footer';

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', Icon: LayoutDashboard },
  { label: 'Entrada NF', to: '/comprar', Icon: ShoppingBag },
  { label: 'Vendas', to: '/vendas', Icon: ShoppingCart },
  { label: 'Produtos', to: '/produtos', Icon: Package },
  { label: 'Clientes', to: '/clientes', Icon: Users },
  { label: 'Fornecedores', to: '/fornecedores', Icon: Factory },
  { label: 'Usuarios', to: '/usuarios', Icon: UserRoundCog },
  {
    label: 'Finanças',
    Icon: Wallet,
    childrens: [
      { label: 'Caixa', to: '/caixa', Icon: Landmark },
      { label: 'Contas a Pagar', to: '/contas-a-pagar', Icon: Coins },
      { label: 'Contas a Receber', to: '/contas-a-receber', Icon: HandCoins },
    ],
  },
];

export const Sidebar = () => {
  const { open, isMobile } = useSidebar();
  return (
    <SidebarUi collapsible="icon">
      <SidebarHeader className="p-3">
        <SidebarMenuItem className="flex items-center gap-2 justify-center">
          <Building2 className={open ? 'size-7' : 'size-6'} />
          <h1
            className={cn(
              open || isMobile ? 'block text-xl font-bold text-primary' : 'hidden',
            )}
          >
            VSP SYSTEM
          </h1>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className={cn('px-2 mt-5', !open && 'lg:items-center')}>
          {navItems.map(navItem => {
            if (navItem.to) {
              return (
                <SidebarMenuItem key={navItem.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === navItem.to}
                  >
                    <a href={navItem.to}>
                      <navItem.Icon className="font-medium" />
                      <span className="text-lg font-medium">{navItem.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            if (navItem.childrens) {
              return <CollapsibleMenu key={navItem.label} menu={navItem} />;
            }
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </SidebarUi>
  );
};
