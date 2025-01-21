import { Customer, IListCustomerResponse } from '@/types/customer';

import { ListParams } from '@/hooks';
import { api } from '@/store/api';

export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getCustomers: build.query<IListCustomerResponse, Partial<ListParams>>({
      query: params => ({
        url: '/customers',
        params,
      }),
      providesTags: response =>
        response
          ? [
              ...response.data.map(({ id }) => ({ type: 'Customer' as const, id })),
              { type: 'Customer', id: 'LIST' },
            ]
          : [{ type: 'Customer', id: 'LIST' }],
    }),
    getCustomer: build.query<Customer, string>({
      query: id => ({ url: `/customers/${id}` }),
      providesTags: (_, __, id) => [{ type: 'Customer', id }],
    }),
    createCustomer: build.mutation<Customer, Customer>({
      query: product => ({
        url: '/customers',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
    }),
    updateCustomer: build.mutation<Customer, Customer>({
      query: product => ({
        url: `/customers/${product.id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Customer', id }],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetCustomerQuery,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} = productApi;
