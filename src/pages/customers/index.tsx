import { Header } from '@/components/header';
import { Users } from 'lucide-react';
import { ListCustomers } from './components';

export const CustomersPage = () => {
	return (
		<div className="flex flex-col w-full">
			<Header title="Listagem de Clientes" Icon={Users} />

			<ListCustomers />
		</div>
	);
};
