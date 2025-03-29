import { Navigation } from '@/components/navigation';
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListPayables } from './components/list-payables';

export default function PayablesPage() {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="flex gap-2 items-center"
            asChild
          >
            <Link to="/contas-a-pagar">
              <Coins className="size-4" />
              <span>Contas a Pagar</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <ListPayables />
    </div>
  );
}
