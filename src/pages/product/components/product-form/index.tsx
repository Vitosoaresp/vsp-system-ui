import { Grid } from '@/components/grid';
import { RhfCurrencyField } from '@/components/rhf/currency-field';
import { RhfSelect } from '@/components/rhf/select';
import { RhfCheckbox } from '@/components/rhf/switch';
import { RhfTextField } from '@/components/rhf/text-field';
import { Button } from '@/components/ui/button';
import { listSuppliersFn } from '@/service/supplier';
import { Product } from '@/types/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ProductHistory } from '../product-history';
import { productSchema } from './schema';

interface ProductFormProps {
	onSubmit: (data: Product) => void;
	initialValues?: Product;
	isLoading?: boolean;
}

export const ProductForm = ({
	initialValues,
	onSubmit,
	isLoading,
}: ProductFormProps) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<Product>({
		defaultValues: initialValues,
		resolver: yupResolver(productSchema),
	});
	const navigate = useNavigate();

	const { data: suppliers } = useQuery({
		queryKey: ['suppliers'],
		queryFn: () => listSuppliersFn({ perPage: 99999 }),
		select: data =>
			data.data.map(supplier => ({
				label: supplier.name,
				value: supplier.id as string,
			})),
	});

	const handleBack = () => navigate('/products');

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid>
				<RhfCheckbox
					control={control}
					name="active"
					label="Ativo"
					error={errors.active}
					defaultValue={true}
					className="col-span-3"
				/>

				<RhfTextField
					type="number"
					control={control}
					name="code"
					label="Código"
					error={errors.code}
					defaultValue={0}
					className="col-span-3 md:col-span-1"
				/>

				<RhfTextField
					type="text"
					control={control}
					name="name"
					label="Nome"
					error={errors.name}
					defaultValue=""
					className="col-span-3 md:col-span-1"
				/>

				<RhfSelect
					control={control}
					name="supplierId"
					label="Fornecedor"
					options={suppliers ?? []}
					error={errors.supplierId}
					className="col-span-3 md:col-span-1"
				/>

				<RhfCurrencyField
					control={control}
					name="grossPrice"
					label="Preço de compra"
					error={errors.grossPrice}
					defaultValue={0}
					className="col-span-3 md:col-span-1"
				/>

				<RhfCurrencyField
					control={control}
					name="salesPrice"
					label="Preço de venda"
					error={errors.salesPrice}
					defaultValue={0}
					className="col-span-3 md:col-span-1"
				/>

				<RhfTextField
					type="number"
					control={control}
					name="quantity"
					label="Quantidade"
					error={errors.quantity}
					defaultValue={0}
					className="col-span-3 md:col-span-1"
				/>

				<RhfTextField
					type="text"
					control={control}
					name="description"
					label="Descrição"
					error={errors.description}
					defaultValue=""
					className="col-span-3 md:col-span-2"
				/>
			</Grid>

			<div className="flex justify-end mt-5 space-x-3">
				{initialValues?.id && (
					<ProductHistory data={initialValues.ProductHistory ?? []} />
				)}
				<Button type="button" onClick={handleBack}>
					Cancelar
				</Button>
				<Button loading={isLoading} variant="outline" type="submit">
					Salvar
				</Button>
			</div>
		</form>
	);
};
