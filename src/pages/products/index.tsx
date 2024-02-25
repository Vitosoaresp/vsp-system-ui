import { Header } from '@/components/header';
import { Package } from 'lucide-react';
import { ListProducts } from './components';

export const ProductsPage = () => {
	return (
		<div className="flex flex-col w-full">
			<Header title="Listagem de Produtos" Icon={Package} />

			<ListProducts />
		</div>
	);
};
