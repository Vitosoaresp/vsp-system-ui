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
import { UserAvatar } from '@/components/user-avatar';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { useMeQuery } from '@/services/session';
import { logout } from '@/store/slices/session';
import { ChevronsUpDown, LogOut, Moon, UserCircle } from 'lucide-react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SidebarFooter = () => {
  const { data: user, isLoading } = useMeQuery();
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { open, isMobile } = useSidebar();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/entrar');
  };

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <SidebarFooterUi>
      <SidebarMenu className={cn('py-5', !open && 'lg:items-center px-0')}>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className={cn(open ? 'py-5' : 'px-0')}>
                <UserAvatar user={user} loading={isLoading} />
                <SidebarMenuBadge className="right-px">
                  <ChevronsUpDown className="size-5" />
                </SidebarMenuBadge>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={isMobile ? 'top' : 'right'}
              className="w-[--radix-popper-anchor-width] min-w-fit"
            >
              <DropdownMenuLabel className="flex gap-2">
                <UserAvatar user={user} loading={isLoading} />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-2" asChild>
                  <a href={`/minha-conta/${user?.id}`}>
                    <UserCircle />
                    <span>Minha conta</span>
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
