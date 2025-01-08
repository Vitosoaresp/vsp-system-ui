import { ListParams } from '@/hooks';
import { api } from '@/lib/api';
import { ApiPaginationResponse } from '@/types/common';
import { IListProductResponse, Product, ProductHistory } from '@/types/product';

export const getProducts = async (
  params?: Partial<ListParams>,
): Promise<IListProductResponse> => {
  const { data } = await api.get<IListProductResponse>('/products', { params });
  return data;
};

export const getProductFn = async (id?: string): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const createProductFn = async (payload: Product): Promise<Product> => {
  const { data } = await api.post<Product>('/products', payload);
  return data;
};

export const updateProductFn = async (payload: Product): Promise<Product> => {
  const { data } = await api.put<Product>(`/products/${payload.id}`, payload);
  return data;
};

export const getProductHistoiresFn = async (
  id: string,
  params: Partial<ListParams>,
): Promise<ApiPaginationResponse<ProductHistory>> => {
  const { data } = await api.get<ApiPaginationResponse<ProductHistory>>(
    `/products/${id}/histories`,
    { params },
  );
  return data;
};
