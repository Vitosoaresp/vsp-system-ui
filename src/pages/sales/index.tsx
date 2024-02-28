import { Header } from '@/components/header';
import { ShoppingCart } from 'lucide-react';
import { ListSales } from './components';

export const SalesPage = () => {
	return (
		<div className="flex flex-col w-full">
			<Header title="Listagem de Vendas" Icon={ShoppingCart} />

			<ListSales />
		</div>
	);
};
