import { ListParams } from '@/hooks';
import { api } from '@/store/api';
import { IListSaleResponse, Sale, SaleDashboard, SalePayload } from '@/types/sale';

export const saleApi = api.injectEndpoints({
  endpoints: builder => ({
    listSales: builder.query<IListSaleResponse, ListParams>({
      query: params => ({
        url: '/sales',
        params,
      }),
      providesTags: response =>
        response
          ? [
              ...response.data.map(({ id }) => ({ type: 'Sale' as const, id })),
              { type: 'Sale', id: 'LIST' },
            ]
          : [{ type: 'Sale', id: 'LIST' }],
    }),
    createSale: builder.mutation<Sale, SalePayload>({
      query: data => ({
        url: '/sales',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Sale', id: 'LIST' }],
    }),
    getSale: builder.query<Sale, string>({
      query: id => ({ url: `/sales/${id}` }),
      providesTags: (_, __, id) => [{ type: 'Sale', id }],
    }),
    deleteSale: builder.mutation<Sale, string>({
      query: id => ({
        url: `/sales/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Sale', id }],
    }),
    getSaleDashboard: builder.query<SaleDashboard[], void>({
      query: () => ({
        url: '/sales/dashboard',
      }),
    }),
  }),
});

export const {
  useCreateSaleMutation,
  useDeleteSaleMutation,
  useGetSaleQuery,
  useGetSaleDashboardQuery,
  useListSalesQuery,
} = saleApi;
