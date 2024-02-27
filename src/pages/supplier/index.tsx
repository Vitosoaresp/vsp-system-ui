import { Header } from '@/components/header';
import {
	createSupplierFn,
	getSupplierFn,
	updateSupplierFn,
} from '@/service/supplier';
import { Supplier } from '@/types/supplier';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Factory } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { SupplierForm } from './components';
import { SupplierSkeleton } from './components/supplier-form/skeleton';

export const SupplierPage = () => {
	const navigate = useNavigate();
	const params = useParams();

	const { mutateAsync: create, isPending: isCreating } = useMutation({
		mutationFn: createSupplierFn,
	});
	const { mutateAsync: update, isPending: isUpdating } = useMutation({
		mutationFn: updateSupplierFn,
	});

	const { data: supplier, isLoading } = useQuery({
		queryKey: ['supplier'],
		queryFn: () => getSupplierFn(params.id),
		enabled: !!params.id,
		retry: 1,
	});

	const handleSubmit = async (data: Supplier) => {
		try {
			const method = params.id ? update : create;
			await method(data);
			toast.success(
				`Fornecedor ${params.id ? 'atualizado' : 'criado'} com sucesso`,
			);
			navigate('/suppliers');
		} catch (error) {
			toast.error(`Error ao ${params.id ? 'atualizar' : 'criar'} o fornecedor`);
		}
	};

	const isSubmiting = isCreating || isUpdating;

	return (
		<div className="flex flex-col w-full">
			<Header
				title={params.id ? 'Editar Fornecedor' : 'Novo Fornecedor'}
				Icon={Factory}
			/>

			<div className="container py-10">
				{isLoading && <SupplierSkeleton />}
				{!isLoading && (
					<SupplierForm
						onSubmit={handleSubmit}
						isLoading={isSubmiting}
						initialValues={params.id ? supplier : undefined}
					/>
				)}
			</div>
		</div>
	);
};
