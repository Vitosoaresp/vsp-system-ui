import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import { getProductHistoiresFn } from '@/service/product';
import { formatCurrency } from '@/utils';
import { ProductAction } from '@/utils/enum';
import { formatDate } from '@/utils/format-date';
import { getProductHistoryActionLabel } from '@/utils/helpers';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const ProductHistory = () => {
  const { id } = useParams<{ id: string }>();
  const { params, handleSetParams } = useSearchParams();
  const { data, isLoading } = useQuery({
    queryFn: () => getProductHistoiresFn(id as string, params),
    queryKey: ['product-histories', params, id],
    enabled: !!id,
    placeholderData: data => data,
  });

  const histories = data?.data;
  const isEmpty = !histories || !histories?.length;

  const handleChangePage = (page: number) => handleSetParams({ page });
  const handleChangeOrderBy = (orderBy: string) => {
    const isSameOrderBy = orderBy === params.orderBy;
    const sort = isSameOrderBy
      ? params.sort === 'desc'
        ? 'asc'
        : 'desc'
      : params.sort;
    handleSetParams({ orderBy, sort });
  };

  return (
    <div className="mt-4">
      <DataTable
        handleChangeOrder={handleChangeOrderBy}
        handleChangePage={handleChangePage}
        meta={data?.meta}
        orderBy={params.orderBy}
        sort={params.sort}
        isLoading={isLoading}
        isEmpty={isEmpty}
        collumns={[
          { label: 'Data', value: 'updatedAt' },
          { label: 'Ação', value: 'action' },
          { label: 'Preço de compra', value: 'grossPrice' },
          { label: 'Quantidade', value: 'quantity' },
          { label: 'Preço de venda', value: 'salesPrice' },
        ]}
      >
        {histories?.map(history => (
          <TableRow key={history.id}>
            <TableCell>{formatDate(history.createdAt)}</TableCell>
            <TableCell>
              <Badge variant="outline">
                {getProductHistoryActionLabel(history.action)}
              </Badge>
            </TableCell>
            <TableCell>
              {history.action === ProductAction.SELL
                ? formatCurrency(history.grossPrice)
                : '-'}
            </TableCell>
            <TableCell>{history.quantity}</TableCell>
            <TableCell>
              {history.action === ProductAction.SELL
                ? formatCurrency(history.salesPrice)
                : '-'}
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </div>
  );
};
