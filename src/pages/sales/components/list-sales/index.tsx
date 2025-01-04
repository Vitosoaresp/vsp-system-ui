import { Collumn, DataTable } from '@/components/data-table';
import { DateRangePicker } from '@/components/date-range-picker';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import { listSalesFn } from '@/service/sale';
import { formatCurrency } from '@/utils';
import { formatDate } from '@/utils/format-date';
import { useQuery } from '@tanstack/react-query';
import { endOfDay, startOfDay } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Link } from 'react-router-dom';
import { ShowDetails } from '../show-details';

const collumns: Collumn[] = [
  { label: 'Id', value: 'id' },
  { label: 'Cliente', value: 'customer' },
  { label: 'Vendedor', value: 'user' },
  { label: 'Valor da venda', value: 'total' },
  { label: 'Status', value: 'status' },
  { label: 'Data da venda', value: 'saleDate' },
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
        startAt: date.from ? startOfDay(date.from).toISOString() : '',
        endAt: date.to ? endOfDay(date.to).toISOString() : '',
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
    <div>
      <div className="mb-5 flex md:justify-between md:flex-row flex-col gap-4">
        <div className="max-w-lg flex gap-4 md:flex-row flex-col w-full items-center">
          <DateRangePicker
            handleChange={handleChangeDate}
            value={{
              from: params.startAt ? new Date(params.startAt) : undefined,
              to: params.endAt ? new Date(params.endAt) : undefined,
            }}
          />
          <Button
            variant="outline"
            className="hover:no-underline"
            onClick={handleClearParams}
          >
            Limpar filtros
          </Button>
        </div>

        <Button variant="outline" className="uppercase">
          <Link to="/venda/">Criar nova venda</Link>
        </Button>
      </div>

      <DataTable
        collumns={collumns}
        isEmpty={data?.meta.total === 0}
        isLoading={isLoading}
        handleChangeOrder={handleChangeOrder}
        meta={data?.meta}
        handleChangePage={page => handleSetParams({ page })}
        orderBy={params.orderBy}
        sort={params.sort}
      >
        {data?.data.map(sale => (
          <TableRow key={sale.id} className="font-medium">
            <TableCell className="py-4">{sale.id}</TableCell>
            <TableCell>{`${sale.customer.firstName} ${sale.customer.lastName}`}</TableCell>
            <TableCell>{sale.user.name}</TableCell>
            <TableCell>{formatCurrency(sale.total)}</TableCell>
            <TableCell>{sale.status}</TableCell>
            <TableCell>{formatDate(sale.saleDate)}</TableCell>
            <TableCell>
              <ShowDetails sale={sale} />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </div>
  );
};
