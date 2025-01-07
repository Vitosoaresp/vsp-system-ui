import { Navigation } from '@/components/navigation';
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Factory } from 'lucide-react';
import { ListSuppliers } from './components';

export const SuppliersPage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink href="/fornecedores" className="flex gap-2 items-center">
            <Factory className="size-4" />
            <span>Fornecedores</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <ListSuppliers />
    </div>
  );
};
