import { ListParams } from '@/hooks';
import { api } from '@/store/api';
import {
  AccountReceivable,
  IListReceivableResponse,
  PayReceivable,
} from '@/types/account-receivable';
import { IFinanceReportByMonth } from '@/types/common';

export const apiRecevable = api.injectEndpoints({
  endpoints: builder => ({
    getReceivables: builder.query<IListReceivableResponse, ListParams>({
      query: params => ({
        url: '/bank/receivables',
        params,
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Account-Receivable' as const,
                id,
              })),
            ]
          : [{ type: 'Account-Receivable' as const, id: 'LIST' }],
    }),
    payReceivable: builder.mutation<AccountReceivable, PayReceivable>({
      query: data => ({
        url: `/bank/receivables/${data.id}/pay`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Account-Receivable', id }],
    }),
    deleteReceivable: builder.mutation<AccountReceivable, string>({
      query: id => ({
        url: `/bank/receivables/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Account-Receivable', id: id }],
    }),
    getReceivableDashboardByMonth: builder.query<IFinanceReportByMonth, string>({
      query: month => ({
        url: `/bank/receivables/dashboard/${month}`,
      }),
      providesTags: () => [{ type: 'Account-Receivable', id: 'Dashboard' }],
    }),
  }),
});

export const {
  useDeleteReceivableMutation,
  useGetReceivablesQuery,
  usePayReceivableMutation,
  useGetReceivableDashboardByMonthQuery,
} = apiRecevable;
