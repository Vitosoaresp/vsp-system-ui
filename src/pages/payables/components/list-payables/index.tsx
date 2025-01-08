import { Collumn, DataTable } from '@/components/data-table';
import { DateRangePicker } from '@/components/date-range-picker';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import { deletePayableFn, listPayablesFn, payPayableFn } from '@/service/payable';
import { PayPayable } from '@/types/account-payable';
import { formatCurrency } from '@/utils';
import { getLabelByEnum, receivableStatusOptions } from '@/utils/enum-options';
import { formatDate } from '@/utils/format-date';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endOfDay, startOfDay } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

const collumns: Collumn[] = [
  { label: 'Data de Vencimento', value: 'dueDate' },
  { label: 'Data do Pagamento', value: 'paidAt' },
  { label: 'Valor', value: 'amount' },
  { label: 'Status', value: 'status' },
  { label: 'Valor pago', value: 'amountPaid' },
  { label: 'Duplicata', value: 'duplicatedRefer' },
  { label: 'Confirmar Recebimento', value: '', disabledSort: true },
  { label: 'Cancelar', value: '', disabledSort: true },
];

export const ListPayables = () => {
  const { params, handleSetParams } = useSearchParams({
    sort: 'desc',
    orderBy: 'updatedAt',
  });
  const query = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['account-payables', params],
    queryFn: () => listPayablesFn(params),
    placeholderData: data => data,
  });

  const { mutateAsync: handlePay, isPending: isPaying } = useMutation({
    mutationFn: payPayableFn,
    onSuccess: () => query.invalidateQueries({ queryKey: ['account-payables'] }),
  });

  const { mutateAsync: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: deletePayableFn,
    onSuccess: () => query.invalidateQueries({ queryKey: ['account-payables'] }),
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

  const handleSubmit = (id: string, data: PayPayable) => {
    try {
      handlePay({ ...data, id });
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
        {data?.data.map(payable => (
          <TableRow key={payable.id} className="font-medium">
            <TableCell>{formatDate(payable.dueDate, 'L')}</TableCell>
            <TableCell>
              {payable.paidAt ? formatDate(payable.paidAt, 'L') : '-'}
            </TableCell>
            <TableCell>{formatCurrency(payable.amount)}</TableCell>
            <TableCell>
              {getLabelByEnum(receivableStatusOptions, payable.status)}
            </TableCell>

            <TableCell>
              {payable.amountPaid ? formatCurrency(payable.amountPaid) : '-'}
            </TableCell>
            <TableCell>{payable.duplicatedRefer ?? '-'}</TableCell>
            <TableCell>
              {/* <Cancelpayable
                handleCancel={handleCancel}
                id={payable.id as string}
                disabled={payable.status === FinancialStatus.CANCELED}
              /> */}
            </TableCell>
            <TableCell />
          </TableRow>
        ))}
      </DataTable>
    </div>
  );
};
