import { ListParams } from '@/hooks';
import { api } from '@/lib/api';
import { IListSupplierResponse, Supplier } from '@/types/supplier';

export const listSuppliersFn = async (
  params?: Partial<ListParams>,
): Promise<IListSupplierResponse> => {
  const { data } = await api.get<IListSupplierResponse>('/suppliers', {
    params,
  });
  return data;
};

export const createSupplierFn = async (
  data: Partial<Supplier>,
): Promise<Supplier> => {
  const { data: supplier } = await api.post<Supplier>('/suppliers', data);
  return supplier;
};

export const getSupplierFn = async (id?: string): Promise<Supplier> => {
  const { data } = await api.get<Supplier>(`/suppliers/${id}`);
  return data;
};

export const updateSupplierFn = async (
  data: Partial<Supplier>,
): Promise<Supplier> => {
  const { data: supplier } = await api.put<Supplier>(`/suppliers/${data.id}`, data);
  return supplier;
};
