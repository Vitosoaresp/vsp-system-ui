import { Collumn, DataTable } from '@/components/data-table';
import { DateRangePicker } from '@/components/date-range-picker';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import {
  deleteReceivableFn,
  listReceivablesFn,
  payReceivableFn,
} from '@/service/receivable';
import { PayReceivable } from '@/types/account-receivable';
import { FinancialStatus } from '@/types/common';
import { formatCurrency } from '@/utils';
import { getLabelByEnum, receivableStatusOptions } from '@/utils/enum-options';
import { formatDate } from '@/utils/format-date';
import { formatInvoiceId } from '@/utils/format-invoice-id';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endOfDay, startOfDay } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';
import { CancelReceivable } from '../cancel-receivable';
import { PayReceivableForm } from '../pay-receivable-form';

const collumns: Collumn[] = [
  { label: 'Fatura', value: 'saleId' },
  { label: 'Valor', value: 'amount' },
  { label: 'Data de Vencimento', value: 'duoDate' },
  { label: 'Status', value: 'status' },
  { label: 'Data do Recebimento', value: 'paidAt' },
  { label: 'Valor pago', value: 'amountReceived' },
  { label: 'Confirmar Recebimento', value: '', disabledSort: true },
  { label: 'Cancelar', value: '', disabledSort: true },
];

export const ListReceivables = () => {
  const { params, handleSetParams } = useSearchParams({
    sort: 'desc',
    orderBy: 'updatedAt',
  });
  const query = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['account-receivables', params],
    queryFn: () => listReceivablesFn(params),
  });

  const { mutateAsync: handlePay, isPending: isPaying } = useMutation({
    mutationFn: payReceivableFn,
    onSuccess: () => query.invalidateQueries({ queryKey: ['account-receivables'] }),
  });

  const { mutateAsync: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: deleteReceivableFn,
    onSuccess: () => query.invalidateQueries({ queryKey: ['account-receivables'] }),
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

  const handleSubmit = (data: PayReceivable) => {
    try {
      handlePay(data);
      toast.success('Conta paga com sucesso');
    } catch (error) {
      toast.error('Erro ao pagar conta');
    }
  };

  const handleCancel = (id: string) => {
    try {
      handleDelete(id);
      toast.success('Conta cancelada com sucesso');
    } catch (error) {
      toast.error('Erro ao cancelar conta');
    }
  };

  return (
    <div className="py-5">
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
            className="text-foreground hover:no-underline"
            onClick={handleClearParams}
          >
            Limpar filtros
          </Button>
        </div>
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
        {data?.data.map(receivable => (
          <TableRow key={receivable.id} className="font-medium">
            <TableCell>{formatInvoiceId(receivable.saleId)}</TableCell>
            <TableCell>{formatCurrency(receivable.amount)}</TableCell>
            <TableCell>{formatDate(receivable.duoDate, 'L')}</TableCell>
            <TableCell>
              {getLabelByEnum(receivableStatusOptions, receivable.status)}
            </TableCell>
            <TableCell>
              {receivable.paidAt ? formatDate(receivable.paidAt, 'L') : '-'}
            </TableCell>
            <TableCell>
              {receivable.amountReceived
                ? formatCurrency(receivable.amountReceived)
                : '-'}
            </TableCell>
            <TableCell>
              <PayReceivableForm
                receivableData={receivable}
                onSubmit={handleSubmit}
                isLoading={isPaying || isDeleting}
                disabled={receivable.status === FinancialStatus.PAID}
              />
            </TableCell>
            <TableCell>
              <CancelReceivable
                handleCancel={handleCancel}
                id={receivable.id as string}
                disabled={receivable.status === FinancialStatus.CANCELED}
              />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </div>
  );
};
