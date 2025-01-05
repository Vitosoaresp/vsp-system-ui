import { ListParams } from '@/hooks';
import { api } from '@/lib/api';
import {
  AccountReceivable,
  IListReceivableResponse,
  PayReceivable,
} from '@/types/account-receivable';

export const listReceivablesFn = async (
  params?: ListParams,
): Promise<IListReceivableResponse> => {
  const { data } = await api.get<IListReceivableResponse>('/bank/receivables', {
    params,
  });
  return data;
};

export const payReceivableFn = async (
  data: PayReceivable,
): Promise<AccountReceivable> => {
  const { data: response } = await api.patch<AccountReceivable>(
    `/bank/receivables/${data.id}/pay`,
    data,
  );
  return response;
};

export const deleteReceivableFn = async (
  id: string,
): Promise<AccountReceivable> => {
  const { data } = await api.delete<AccountReceivable>(`/bank/receivables/${id}`);
  return data;
};
