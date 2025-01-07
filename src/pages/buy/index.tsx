import { Navigation } from '@/components/navigation';
import { BuyForm } from './components/buy-form';

export default function BuyPage() {
  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <></>
      </Navigation>

      <BuyForm />
    </div>
  );
}
