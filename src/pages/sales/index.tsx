import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { ShoppingCart } from 'lucide-react';
import { ListSales } from './components';

export const SalesPage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/vendas" className="flex gap-2 items-center">
              <ShoppingCart className="size-4" />
              <span>Vendas</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ListSales />
    </div>
  );
};
