import { Navigation } from '@/components/navigation';
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListSales } from './components';

export const SalesPage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="flex gap-2 items-center">
            <Link to="/vendas">
              <ShoppingCart className="size-4" />
              <span>Vendas</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <ListSales />
    </div>
  );
};
