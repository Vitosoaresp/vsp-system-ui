import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ProductHistory as ProductHistoryProp } from '@/types/product';
import { formatCurrency } from '@/utils';
import { formatDate } from '@/utils/format-date';

interface ProductHistoryProps {
	data: ProductHistoryProp[];
}

export const ProductHistory = ({ data }: ProductHistoryProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">Ver histórico do produto</Button>
			</DialogTrigger>

			<DialogContent className="bg-zinc-950 border-zinc-800 max-w-xl">
				<DialogTitle className="text-zinc-50">Historico do produto</DialogTitle>
				<div className="py-4">
					<div className="flex text-zinc-200 justify-between py-2 border-b border-zinc-800">
						<p className="w-24">Data</p>
						<p className="w-10">Ação</p>
						<p>P. custo</p>
						<p>Quant.</p>
						<p>P. venda</p>
					</div>
					{data.map(history => (
						<div
							key={history.id}
							className="flex text-zinc-200 justify-between py-3 border-b border-zinc-800"
						>
							<p className="w-24">{formatDate(history.createdAt, 'L')}</p>
							<p>{history.action}</p>
							<p>{formatCurrency(history.grossPrice)}</p>
							<p>{history.quantity}</p>
							<p>{formatCurrency(history.salesPrice)}</p>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};
