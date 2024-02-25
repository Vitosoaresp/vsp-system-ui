import { Header } from '@/components/header';
import { Factory } from 'lucide-react';
import { ListSuppliers } from './components';

export const SuppliersPage = () => {
	return (
		<div className="flex flex-col w-full">
			<Header title="Listagem de Fornecedores" Icon={Factory} />

			<ListSuppliers />
		</div>
	);
};
