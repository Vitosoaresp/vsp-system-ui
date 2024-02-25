import { Header } from '@/components/header';
import { ListCustomers } from './components';

export const CustomersPage = () => {
	return (
		<div className="flex flex-col w-full">
			<Header title="Listagem de Clientes" />

			<ListCustomers />
		</div>
	);
};
