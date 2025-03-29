import { Navigation } from '@/components/navigation';
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { HandCoins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListReceivables } from './components';
import { StepsProvider } from './providers/steps';

export const ReceivablePage = () => {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="flex gap-2 items-center">
            <Link to="/contas-a-receber">
              <HandCoins className="size-4" />
              <span>Contas a Receber</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>
      <StepsProvider>
        <ListReceivables />
      </StepsProvider>
    </div>
  );
};
