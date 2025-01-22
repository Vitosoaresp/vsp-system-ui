import { ListParams } from '@/hooks';
import { api } from '@/store/api';
import {
  AccountPayable,
  IListPayablesResponse,
  PayPayable,
} from '@/types/account-payable';

export const payableApi = api.injectEndpoints({
  endpoints: builder => ({
    listPayables: builder.query<IListPayablesResponse, ListParams>({
      query: params => ({ url: '/bank/payables', params }),
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Account-Payable' as const,
                id,
              })),
            ]
          : [{ type: 'Account-Payable' as const, id: 'LIST' }],
    }),
    payPayable: builder.mutation<AccountPayable, PayPayable>({
      query: data => ({
        url: `/bank/payables/${data.id}/pay`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Account-Payable', id }],
    }),
    deletePayable: builder.mutation<AccountPayable, string>({
      query: id => ({
        url: `/bank/payables/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Account-Payable', id }],
    }),
  }),
});

export const {
  useDeletePayableMutation,
  useListPayablesQuery,
  usePayPayableMutation,
} = payableApi;
