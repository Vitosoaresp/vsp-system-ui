import { RhfCurrencyField } from '@/components/rhf/currency-field';
import { RhfTextField } from '@/components/rhf/text-field';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { SalePayload } from '@/types/sale';
import { formatCurrency } from '@/utils';
import { Package2, Trash, X } from 'lucide-react';
import { useCallback } from 'react';
import { FieldArrayWithId, useFormContext } from 'react-hook-form';

interface TableProductsProps {
	handleRemoveProduct: (index: number) => void;
	products: FieldArrayWithId<SalePayload, 'items', 'id'>[];
}

export const TableProducts = ({
	handleRemoveProduct,
	products,
}: TableProductsProps) => {
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext<SalePayload>();
	const watchedProducts = watch('items');

	const getProductTotal = useCallback(
		(index: number) => {
			const quantity = watchedProducts[index].quantity;
			const price = watchedProducts[index].price;
			return quantity * price;
		},
		[watchedProducts],
	);

	return (
		<>
			<h2 className="text-zinc-50 text-xl font-medium mt-10 flex">
				<Package2 className="text-zinc-50 mr-3" />
				Produtos
			</h2>

			<Table className="my-5">
				<TableHeader>
					<TableRow className="hover:bg-zinc-900">
						<TableHead className="text-zinc-50">Código</TableHead>
						<TableHead className="text-zinc-50">Nome</TableHead>
						<TableHead className="text-zinc-50">Quantidade</TableHead>
						<TableHead className="text-zinc-50">Preço</TableHead>
						<TableHead className="text-zinc-50">Total</TableHead>
						<TableHead>
							<Trash className="text-zinc-50 w-5 h-5" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{!products.length && (
						<TableRow className="hover:bg-zinc-800">
							<TableCell
								colSpan={6}
								className={cn(
									'text-center text-xl font-medium py-4',
									errors?.items ? 'text-red-500' : 'text-zinc-50',
								)}
							>
								Nenhum produto selecionado
							</TableCell>
						</TableRow>
					)}
					{products?.map((product, i) => (
						<TableRow key={product.id} className="hover:bg-zinc-900">
							<TableCell className="text-zinc-50">{product.code}</TableCell>
							<TableCell className="text-zinc-50">{product.name}</TableCell>
							<TableCell className="text-zinc-50">
								<RhfTextField
									control={control}
									name={`items.${i}.quantity` as const}
									type="number"
									label=""
									className="w-20"
									error={errors?.items?.[i]?.quantity}
								/>
							</TableCell>
							<TableCell className="text-zinc-50">
								<RhfCurrencyField
									control={control}
									name={`items.${i}.price` as const}
									label=""
									className="w-20"
									error={errors?.items?.[i]?.price}
								/>
							</TableCell>
							<TableCell className="text-zinc-50">
								{formatCurrency(getProductTotal(i))}
							</TableCell>
							<TableCell>
								<Button
									variant="link"
									className="bg-transparent px-0"
									onClick={() => handleRemoveProduct(i)}
								>
									<X className="text-zinc-300" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
