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
} from '@/components/ui/sidebar';
import { useAuthContext } from '@/hooks';
import { useTheme } from '@/hooks/use-theme';
import { ChevronRight, LogOut, Moon, UserCircle } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const SidebarFooter = () => {
  const { user, logout } = useAuthContext();
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/entrar');
  };

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <SidebarFooterUi>
      <SidebarMenu className="py-4">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="py-5">
                <Avatar className="size-8">
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {user?.name}
                  </span>
                  <span className="text-xs text-foreground/90">{user?.email}</span>
                </div>
                <SidebarMenuBadge>
                  <ChevronRight className="size-5" />
                </SidebarMenuBadge>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="w-[--radix-popper-anchor-width]"
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
