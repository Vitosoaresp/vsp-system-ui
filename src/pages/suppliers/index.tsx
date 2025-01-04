import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Factory } from 'lucide-react';
import { ListSuppliers } from './components';

export const SuppliersPage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/fornecedores"
              className="flex gap-2 items-center"
            >
              <Factory className="size-4" />
              <span>Fornecedores</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ListSuppliers />
    </div>
  );
};
