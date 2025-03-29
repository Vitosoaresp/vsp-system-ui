import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
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
            <BreadcrumbLink className="flex gap-2 items-center" asChild>
              <Link to="/">
                <Home className="size-4" />
                <span>Inicio</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {children && <BreadcrumbSeparator />}
          {children}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
