import { Navigation } from '@/components/navigation';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home, Package } from 'lucide-react';
import { ListProducts } from './components';

export const ProductsPage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex gap-2 items-center">
            <Home className="size-4" />
            <span>Inicio</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/produtos" className="flex gap-2 items-center">
            <Package className="size-4" />
            <span>Produtos</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <ListProducts />
    </div>
  );
};
