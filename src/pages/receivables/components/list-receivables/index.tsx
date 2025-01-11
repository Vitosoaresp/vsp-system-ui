import { Collumn, DataTable } from '@/components/data-table';
import { DateRangePicker } from '@/components/date-range-picker';
import { SearchBar } from '@/components/search-bar';
import { StatusCombobox } from '@/components/status-combobox';
import { Badge } from '@/components/ui/badge';
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
import { CircleCheck, CircleEllipsis, CircleX } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';
import { CancelReceivable } from '../cancel-receivable';
import { PayReceivableForm } from '../pay-receivable-form';

const collumns: Collumn[] = [
  { label: 'Fatura', value: 'saleId' },
  { label: 'Valor', value: 'amount' },
  { label: 'Status', value: 'status' },
  { label: 'Valor pago', value: 'amountReceived' },
  { label: 'Data do Recebimento', value: 'paidAt' },
  { label: 'Data de Vencimento', value: 'duoDate' },
  { label: 'Data de Criação', value: 'createdAt' },
  { label: 'Confirmar Recebimento', value: 'confirm', disabledSort: true },
  { label: 'Cancelar', value: 'deletedAt', disabledSort: true },
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
    placeholderData: data => data,
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

  const handleChangeSearch = (search: string) => {
    handleSetParams({ search });
  };

  const handleClearParams = () => {
    handleSetParams({
      startAt: '',
      endAt: '',
      status: '',
      search: '',
    });
  };

  const handleSubmit = async (data: PayReceivable) => {
    try {
      await handlePay(data);
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

  const handleChangeStatus = (status: FinancialStatus | null) => {
    handleSetParams({ status: status ?? '' });
  };

  return (
    <div className="py-5">
      <div className="mb-5 flex md:justify-between md:flex-row flex-col gap-4">
        <div className="max-w-2xl flex gap-4 md:flex-row flex-col w-full items-center">
          <SearchBar
            value={params.search}
            onChange={handleChangeSearch}
            placeholder="Pesquise por cliente ou vendedor"
          />
          <DateRangePicker
            handleChange={handleChangeDate}
            value={{
              from: params.startAt ? new Date(params.startAt) : undefined,
              to: params.endAt ? new Date(params.endAt) : undefined,
            }}
          />
          <StatusCombobox
            value={params.status as FinancialStatus}
            onChange={handleChangeStatus}
          />
          <Button
            variant="outline"
            className="text-foreground hover:no-underline"
            size="lg"
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
            <TableCell>
              <Badge
                variant="outline"
                className="flex items-center gap-1 w-fit mx-auto uppercase"
              >
                {receivable.status === FinancialStatus.PAID ? (
                  <CircleCheck className="size-4" />
                ) : receivable.status === FinancialStatus.CANCELED ? (
                  <CircleX className="size-4" />
                ) : (
                  <CircleEllipsis className="size-4" />
                )}
                {getLabelByEnum(receivableStatusOptions, receivable.status)}
              </Badge>
            </TableCell>
            <TableCell>
              {receivable.amountReceived
                ? formatCurrency(receivable.amountReceived)
                : '-'}
            </TableCell>
            <TableCell>
              {receivable.paidAt
                ? formatDate(receivable.paidAt, 'DD/MM/YYYY')
                : '-'}
            </TableCell>
            <TableCell>{formatDate(receivable.duoDate, 'DD/MM/YYYY')}</TableCell>
            <TableCell>{formatDate(receivable.createdAt, 'DD/MM/YYYY')}</TableCell>
            <TableCell>
              <PayReceivableForm
                receivableData={receivable}
                onSubmit={handleSubmit}
                isLoading={isPaying || isDeleting}
                disabled={receivable.status !== FinancialStatus.PENDING}
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
