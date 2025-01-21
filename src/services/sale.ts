import { ListParams } from '@/hooks';
import { api } from '@/lib/api';
import { IListSaleResponse, Sale, SaleDashboard, SalePayload } from '@/types/sale';

export const listSalesFn = async (
  params?: ListParams,
): Promise<IListSaleResponse> => {
  const { data } = await api.get<IListSaleResponse>('/sales', {
    params,
  });
  return data;
};

export const createSaleFn = async (data: SalePayload): Promise<Sale> => {
  const { data: sale } = await api.post<Sale>('/sales', data);
  return sale;
};

export const getSaleFn = async (id?: string): Promise<Sale> => {
  const { data } = await api.get<Sale>(`/sales/${id}`);
  return data;
};

export const deleteSaleFn = async (id: string): Promise<Sale> => {
  const { data } = await api.delete<Sale>(`/sales/${id}`);
  return data;
};

export const getSaleDashboardFn = async (): Promise<SaleDashboard[]> => {
  const { data } = await api.get<SaleDashboard[]>('/sales/dashboard');
  return data;
};
