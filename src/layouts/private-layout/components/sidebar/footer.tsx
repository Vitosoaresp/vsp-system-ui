import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarFooter as SidebarFooterUi,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuthContext } from '@/hooks';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { ChevronRight, LogOut, Moon, UserCircle } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const SidebarFooter = () => {
  const { user, logout } = useAuthContext();
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { open, isMobile } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate('/entrar');
  };

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <SidebarFooterUi>
      <SidebarMenu className={cn('px-2 py-5', !open && 'lg:items-center px-0')}>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className={cn(open ? 'py-5' : 'px-0')}>
                <Avatar className="size-8">
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className={cn('flex flex-col', !open && 'hidden')}>
                  <span className="text-sm font-medium text-foreground">
                    {user?.name}
                  </span>
                  <span className="text-xs text-foreground/90">{user?.email}</span>
                </div>
                <SidebarMenuBadge className="right-px">
                  <ChevronRight className="size-5" />
                </SidebarMenuBadge>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={isMobile ? 'top' : 'right'}
              className="w-[--radix-popper-anchor-width] min-w-fit"
            >
              <DropdownMenuLabel className="flex gap-2">
                <Avatar className="size-8">
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {user?.name}
                  </span>
                  <span className="text-xs text-foreground/90">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-2" asChild>
                  <a href={`/perfil/${user?.id}`}>
                    <UserCircle />
                    <span>Perfil</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2" onClick={handleToggleTheme}>
                  <Moon />
                  <span>Mudar tema</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2" onClick={handleLogout}>
                <LogOut />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterUi>
  );
};
