import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Package } from 'lucide-react';
import { ListProducts } from './components';

export const ProductsPage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/produtos" className="flex gap-2 items-center">
              <Package className="size-4" />
              <span>Produtos</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ListProducts />
    </div>
  );
};
