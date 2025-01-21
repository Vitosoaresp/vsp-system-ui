import { ListParams } from '@/hooks';
import { api } from '@/lib/api';
import {
  AccountPayable,
  IListPayablesResponse,
  PayPayable,
} from '@/types/account-payable';

export const listPayablesFn = async (
  params?: ListParams,
): Promise<IListPayablesResponse> => {
  const { data } = await api.get<IListPayablesResponse>('/bank/payables', {
    params,
  });
  return data;
};

export const payPayableFn = async (
  data: PayPayable & { id: string },
): Promise<AccountPayable> => {
  const { data: response } = await api.post<AccountPayable>(
    `/bank/payables/${data.id}/pay`,
    data,
  );
  return response;
};

export const deletePayableFn = async (id: string): Promise<AccountPayable> => {
  const { data } = await api.delete<AccountPayable>(`/bank/payables/${id}`);
  return data;
};
