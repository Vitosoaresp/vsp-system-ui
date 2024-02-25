import { AvatarMenu } from '@/components/avatar-menu';
import { useMe } from '@/hooks';
import {
	createSupplierFn,
	getSupplierFn,
	updateSupplierFn,
} from '@/service/supplier';
import { Supplier } from '@/types/supplier';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { SupplierForm } from './components';
import { SupplierSkeleton } from './components/supplier-form/skeleton';

export const SupplierPage = () => {
	const me = useMe();
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
			<header className="flex justify-between w-full p-2 md:px-4 md:py-8 items-center border-b border-zinc-800">
				<div className="md:ml-10 ml-2">
					<h1 className="text-zinc-50 md:text-xl text-base font-bold uppercase">
						{params.id ? 'Editar Fornecedor' : 'Novo Fornecedor'}
					</h1>
				</div>
				<AvatarMenu user={me} />
			</header>

			<div className="max-w-3xl px-6 py-10">
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
