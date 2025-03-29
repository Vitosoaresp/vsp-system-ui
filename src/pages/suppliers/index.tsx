import { Navigation } from '@/components/navigation';
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListSuppliers } from './components';

export const SuppliersPage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="flex gap-2 items-center">
            <Link to="/fornecedores">
              <Factory className="size-4" />
              <span>Fornecedores</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <ListSuppliers />
    </div>
  );
};
