import { Navigation } from '@/components/navigation';
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { ShoppingBag } from 'lucide-react';
import { BuyForm } from './components/buy-form';

export default function BuyPage() {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clientes" className="flex gap-2 items-center">
            <ShoppingBag className="size-4" />
            <span>Entrada NF</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <BuyForm />
    </div>
  );
}
