import { Navigation } from '@/components/navigation';
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListCustomers } from './components';

export const CustomersPage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="flex gap-2 items-center"
            asChild
          >
            <Link to="/clientes">
              <Users className="size-4" />
              <span>Clientes</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <ListCustomers />
    </div>
  );
};
