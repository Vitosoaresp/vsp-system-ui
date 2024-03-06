import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getProducts } from '@/service/product';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { PackageCheck } from 'lucide-react';

interface SelectProductsProps {
	handleToggleProduct: (product: Product) => void;
	selectedProducts: Product[];
	handleAppendProducts: () => void;
}

export const SelectProducts = ({
	selectedProducts,
	handleToggleProduct,
	handleAppendProducts,
}: SelectProductsProps) => {
	const { data: products } = useQuery({
		queryKey: ['products'],
		queryFn: () => getProducts(),
		select: data => data.data,
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Adicionar Produto</Button>
			</DialogTrigger>
			<DialogContent className="bg-zinc-950 border-zinc-700">
				<DialogTitle className="text-zinc-50">Selecione um Produto</DialogTitle>

				<div className="mt-5">
					<Table>
						<TableHeader className="">
							<TableRow className="hover:bg-zinc-800">
								<TableCell>
									<PackageCheck className="text-zinc-50" />
								</TableCell>
								<TableCell className="text-zinc-50 text-lg font-medium">
									Código
								</TableCell>
								<TableCell className="text-zinc-50 text-lg font-medium">
									Nome
								</TableCell>
								<TableCell className="text-zinc-50 text-lg font-medium">
									Preço
								</TableCell>
								<TableCell className="text-zinc-50 text-lg font-medium">
									Quant.
								</TableCell>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products?.map(product => (
								<TableRow key={product.id} className="hover:bg-zinc-800 h-14">
									<TableCell className="">
										<Checkbox
											onCheckedChange={() => handleToggleProduct(product)}
											checked={selectedProducts.some(p => p.id === product.id)}
											className="border-zinc-50 data-[state=checked]:bg-zinc-50 data-[state=checked]:text-zinc-950 h-4 max-h-4"
										/>
									</TableCell>
									<TableCell className="text-zinc-50">{product.code}</TableCell>
									<TableCell className="text-zinc-50">{product.name}</TableCell>
									<TableCell className="text-zinc-50">
										{formatCurrency(product.salesPrice)}
									</TableCell>
									<TableCell className="text-zinc-50">
										{product.quantity}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<DialogFooter className="mt-5">
						<DialogClose asChild>
							<Button onClick={handleAppendProducts}>Selecionar</Button>
						</DialogClose>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};
