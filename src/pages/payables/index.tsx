import { Navigation } from '@/components/navigation';
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Coins } from 'lucide-react';
import { ListPayables } from './components/list-payables';

export default function PayablesPage() {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/contas-a-pagar"
            className="flex gap-2 items-center"
          >
            <Coins className="size-4" />
            <span>Contas a Pagar</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <ListPayables />
    </div>
  );
}
