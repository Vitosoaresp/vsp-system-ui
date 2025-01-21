import { ListParams } from '@/hooks';
import { api } from '@/store/api';
import { ApiListResponse } from '@/types/common';
import { IListProductResponse, Product, ProductHistory } from '@/types/product';

export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<IListProductResponse, Partial<ListParams>>({
      query: params => ({
        url: '/products',
        params,
      }),
      providesTags: response =>
        response
          ? [
              ...response.data.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProduct: build.query<Product, string>({
      query: id => ({ url: `/products/${id}` }),
      providesTags: (_, __, id) => [{ type: 'Product', id }],
    }),
    createProduct: build.mutation<Product, Product>({
      query: product => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: build.mutation<Product, Product>({
      query: product => ({
        url: `/products/${product.id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Product', id }],
    }),
    getProductHistoires: build.query<
      ApiListResponse<ProductHistory>,
      { id: string; params: Partial<ListParams> }
    >({
      query: ({ id, params }) => ({
        url: `/products/${id}/histories`,
        params,
      }),
    }),
  }),
});

export const {
  useGetProductHistoiresQuery,
  useCreateProductMutation,
  useGetProductQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} = productApi;
