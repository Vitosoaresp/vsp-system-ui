import { Collumn, DataTable } from '@/components/data-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import { getProducts } from '@/service/product';
import { formatCurrency } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

const tableColumns: Collumn[] = [
	{ label: 'Código', value: 'code' },
	{ label: 'Nome', value: 'name' },
	{ label: 'Preço', value: 'price' },
	{ label: 'Quantidade', value: 'quantity' },
	{ label: 'Atualizado em', value: 'updatedAt' },
	{ label: 'Editar/Visalizar', value: '', disabledSort: true },
];

export const ListProducts = () => {
	const { params, handleSetParams } = useSearchParams({
		sort: 'desc',
		orderBy: 'updatedAt',
	});

	const { data, isLoading } = useQuery({
		queryKey: ['products'],
		queryFn: () => getProducts(params),
	});

	const handleChangeOrder = (column: string) => {
		handleSetParams({
			orderBy: column,
			sort: params.orderBy === column && params.sort === 'asc' ? 'desc' : 'asc',
		});
	};

	return (
		<div className='p-5'>
			<DataTable
				collumns={tableColumns}
				isEmpty={data?.meta.total === 0}
				isLoading={isLoading}
				handleChangeOrder={handleChangeOrder}
				meta={data?.meta}
				handleChangePage={(page) => handleSetParams({ page })}
			>
				{data?.data.map((product) => (
					<TableRow
						key={product.id}
						className='text-zinc-50 hover:bg-zinc-800 font-medium'
					>
						<TableCell className='py-4'>{product.code}</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{formatCurrency(product.price)}</TableCell>
						<TableCell>{product.quantity}</TableCell>
						<TableCell>{product.updatedAt}</TableCell>
						<TableCell>
							<Link to={`/product/${product.id}`} className='px-5 block'>
								<Pencil size={24} className='text-zinc-50' />
							</Link>
						</TableCell>
					</TableRow>
				))}
			</DataTable>
		</div>
	);
};
