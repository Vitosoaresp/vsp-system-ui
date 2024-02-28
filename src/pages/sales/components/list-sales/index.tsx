import { Collumn, DataTable } from '@/components/data-table';
import { DateRangePicker } from '@/components/date-range-picker';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import { listSalesFn } from '@/service/sale';
import { formatCurrency } from '@/utils';
import { formatDate } from '@/utils/format-date';
import { useQuery } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Link } from 'react-router-dom';

const collumns: Collumn[] = [
	{ label: 'Id', value: 'id' },
	{ label: 'Cliente', value: 'customer' },
	{ label: 'Vendedor', value: 'user' },
	{ label: 'Valor da venda', value: 'total' },
	{ label: 'Status', value: 'status' },
	{ label: 'Atualizado em', value: 'updatedAt' },
	{ label: 'Visualizar', value: '', disabledSort: true },
];

export const ListSales = () => {
	const { params, handleSetParams } = useSearchParams({
		sort: 'desc',
		orderBy: 'updatedAt',
	});

	const { data, isLoading } = useQuery({
		queryKey: ['sales', params],
		queryFn: () => listSalesFn(params),
	});

	const handleChangeOrder = (column: string) => {
		handleSetParams({
			orderBy: column,
			sort: params.orderBy === column && params.sort === 'asc' ? 'desc' : 'asc',
		});
	};

	const handleChangeDate = (date?: DateRange) => {
		if (date?.from || date?.to) {
			handleSetParams({
				startAt: date?.from?.toISOString() ?? '',
				endAt: date?.to?.toISOString() ?? '',
			});
		}
	};

	const handleClearParams = () => {
		handleSetParams({
			startAt: '',
			endAt: '',
			status: '',
		});
	};

	return (
		<div className="py-5 container">
			<div className="mb-5 flex md:justify-between md:flex-row flex-col gap-4">
				<div className="max-w-lg flex gap-4 md:flex-row flex-col w-full">
					<DateRangePicker
						handleChange={handleChangeDate}
						value={{
							from: params.startAt ? new Date(params.startAt) : undefined,
							to: params.endAt ? new Date(params.endAt) : undefined,
						}}
					/>
					<Button
						variant="link"
						className="text-zinc-50 hover:no-underline"
						onClick={handleClearParams}
					>
						Limpar filtros
					</Button>
				</div>

				<Button variant="outline" className="uppercase">
					<Link to="/sale/">Criar nova venda</Link>
				</Button>
			</div>

			<DataTable
				collumns={collumns}
				isEmpty={data?.meta.total === 0}
				isLoading={isLoading}
				handleChangeOrder={handleChangeOrder}
				meta={data?.meta}
				handleChangePage={page => handleSetParams({ page })}
			>
				{data?.data.map(sale => (
					<TableRow
						key={sale.id}
						className="text-zinc-50 hover:bg-zinc-800 font-medium"
					>
						<TableCell className="py-4">{sale.id}</TableCell>
						<TableCell>{`${sale.customer.firstName} + ${sale.customer.lastName}`}</TableCell>
						<TableCell>{sale.user.name}</TableCell>
						<TableCell>{formatCurrency(sale.total)}</TableCell>
						<TableCell>{sale.status}</TableCell>
						<TableCell>{formatDate(sale.updatedAt)}</TableCell>
						<TableCell>
							<Link to={`/sale/${sale.id}`}>
								<Pencil size={24} className="text-zinc-50" />
							</Link>
						</TableCell>
					</TableRow>
				))}
			</DataTable>
		</div>
	);
};
