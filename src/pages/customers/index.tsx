import { Navigation } from '@/components/navigation';
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Users } from 'lucide-react';
import { ListCustomers } from './components';

export const CustomersPage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clientes" className="flex gap-2 items-center">
            <Users className="size-4" />
            <span>Clientes</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <ListCustomers />
    </div>
  );
};
