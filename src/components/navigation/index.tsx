import { Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { SidebarTrigger } from '../ui/sidebar';

export const Navigation = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-3">
      <SidebarTrigger />

      <div data-orientation="vertical" className="shrink-0 bg-border w-px h-4" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex gap-2 items-center">
              <Home className="size-4" />
              <span>Inicio</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {children && <BreadcrumbSeparator />}
          {children}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
