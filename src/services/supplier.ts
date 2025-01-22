import { ListParams } from '@/hooks';
import { api } from '@/store/api';
import { IListSupplierResponse, Supplier } from '@/types/supplier';

export const supplierApi = api.injectEndpoints({
  endpoints: builder => ({
    listSuppliers: builder.query<IListSupplierResponse, Partial<ListParams>>({
      query: params => ({
        url: '/suppliers',
        params,
      }),
      providesTags: response =>
        response
          ? [
              ...response.data.map(({ id }) => ({ type: 'Supplier' as const, id })),
              { type: 'Supplier', id: 'LIST' },
            ]
          : [{ type: 'Supplier', id: 'LIST' }],
    }),
    createSupplier: builder.mutation<Supplier, Supplier>({
      query: data => ({
        url: '/suppliers',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Supplier', id: 'LIST' }],
    }),
    getSupplier: builder.query<Supplier, string>({
      query: id => ({ url: `/suppliers/${id}` }),
      providesTags: (_, __, id) => [{ type: 'Supplier', id }],
    }),
    updateSupplier: builder.mutation<Supplier, Partial<Supplier>>({
      query: data => ({
        url: `/suppliers/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Supplier', id }],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useGetSupplierQuery,
  useListSuppliersQuery,
  useUpdateSupplierMutation,
} = supplierApi;
