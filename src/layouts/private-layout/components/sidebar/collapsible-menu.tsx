import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types/common';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const CollapsibleMenu = ({ menu }: { menu: NavItem }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton asChild>
            <button>
              <menu.Icon className="font-medium" />
              <span className="text-lg font-medium">{menu.label}</span>
              <SidebarMenuBadge>
                <ChevronRight
                  className={cn(open && 'rotate-90', 'transition-all')}
                />
              </SidebarMenuBadge>
            </button>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {menu.childrens?.map(child => (
              <SidebarMenuSubItem key={child.label}>
                <SidebarMenuSubButton
                  asChild
                  isActive={location.pathname === child.to}
                >
                  <Link to={child.to}>
                    <child.Icon className="font-medium" />
                    <span className="text-lg font-medium">{child.label}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
