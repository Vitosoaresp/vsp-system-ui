import { Header } from '@/components/header';
import { ShoppingBag } from 'lucide-react';
import { BuyForm } from './components/buy-form';

export default function BuyPage() {
	return (
		<div className="flex flex-col w-full">
			<Header title="Entrada em NF" Icon={ShoppingBag} />

			<BuyForm />
		</div>
	);
}
