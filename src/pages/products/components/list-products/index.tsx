import { Collumn, DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import { getProducts } from '@/service/product';
import { formatCurrency } from '@/utils';
import { formatDate } from '@/utils/format-date';
import { useQuery } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const tableColumns: Collumn[] = [
	{ label: 'Código', value: 'code' },
	{ label: 'Nome', value: 'name' },
	{ label: 'Preço de compra', value: 'grossPrice' },
	{ label: 'Preço de venda', value: 'salesPrice' },
	{ label: 'Quantidade', value: 'quantity' },
	{ label: 'Atualizado em', value: 'updatedAt' },
	{ label: 'Status', value: 'active' },
	{ label: 'Editar', value: '', disabledSort: true },
];

export const ListProducts = () => {
	const [search, setSearch] = useState('');
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

	const handleChangeSearch = () => {
		handleSetParams({ search });
	};

	return (
		<div className="p-5">
			<div className="mb-5 flex md:justify-between md:flex-row flex-col gap-4">
				<div className="max-w-lg flex gap-4 md:flex-row flex-col">
					<Input
						value={search}
						onChange={({ target }) => setSearch(target.value)}
						placeholder="Perquisar por nome, email, telefone ou cnpj"
					/>
					<Button
						type="button"
						variant="outline"
						className="uppercase"
						onClick={handleChangeSearch}
					>
						Pesquisar
					</Button>
				</div>
				<Button variant="outline" className="uppercase">
					<Link to="/product/">Criar novo produto</Link>
				</Button>
			</div>
			<DataTable
				collumns={tableColumns}
				isEmpty={data?.meta.total === 0}
				isLoading={isLoading}
				handleChangeOrder={handleChangeOrder}
				meta={data?.meta}
				handleChangePage={page => handleSetParams({ page })}
			>
				{data?.data.map(product => (
					<TableRow
						key={product.id}
						className="text-zinc-50 hover:bg-zinc-800 font-medium"
					>
						<TableCell className="py-4">{product.code}</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{formatCurrency(product.grossPrice)}</TableCell>
						<TableCell>{formatCurrency(product.salesPrice)}</TableCell>
						<TableCell>{product.quantity}</TableCell>
						<TableCell>{formatDate(product.updatedAt)}</TableCell>
						<TableCell>{product.active ? 'Ativo' : 'Inativo'}</TableCell>
						<TableCell>
							<Link to={`/product/${product.id}`} className="px-2 block">
								<Pencil size={24} className="text-zinc-50" />
							</Link>
						</TableCell>
					</TableRow>
				))}
			</DataTable>
		</div>
	);
};
