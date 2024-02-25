import { Header } from '@/components/header';
import {
	createCustomerFn,
	getCustomerFn,
	updateCustomerFn,
} from '@/service/customer';
import { Customer } from '@/types/customer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { CustomerForm } from './components';
import { CustomerSkeleton } from './components/customer-form/skeleton';

export const CustomerPage = () => {
	const navigate = useNavigate();
	const params = useParams();

	const { mutateAsync: create, isPending: isCreating } = useMutation({
		mutationFn: createCustomerFn,
	});
	const { mutateAsync: update, isPending: isUpdating } = useMutation({
		mutationFn: updateCustomerFn,
	});

	const { data: customer, isLoading } = useQuery({
		queryKey: ['customer'],
		queryFn: () => getCustomerFn(params.id),
		enabled: !!params.id,
		retry: 1,
	});

	const handleSubmit = async (data: Customer) => {
		try {
			const method = params.id ? update : create;
			await method(data);
			toast.success(
				`Cliente ${params.id ? 'atualizado' : 'criado'} com sucesso`,
			);
			navigate('/customers');
		} catch (error) {
			toast.error(`Error ao ${params.id ? 'atualizar' : 'criar'} o cliente`);
		}
	};

	const isSubmiting = isCreating || isUpdating;

	return (
		<div className="flex flex-col w-full">
			<Header
				title={params.id ? 'Editar Cliente' : 'Novo Cliente'}
				Icon={Users}
			/>

			<div className="max-w-3xl px-6 py-10">
				{isLoading && <CustomerSkeleton />}
				{!isLoading && (
					<CustomerForm
						onSubmit={handleSubmit}
						isLoading={isSubmiting}
						initialValues={params.id ? customer : undefined}
					/>
				)}
			</div>
		</div>
	);
};
