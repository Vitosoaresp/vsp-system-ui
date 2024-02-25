import { ListParams } from '@/hooks';
import { api } from '@/lib/api';
import { Customer, IListCustomerResponse } from '@/types/customer';

export const listCustomersFn = async (
	params?: ListParams,
): Promise<IListCustomerResponse> => {
	const { data } = await api.get<IListCustomerResponse>('/customers', {
		params,
	});
	return data;
};

export const createCustomerFn = async (data: Customer): Promise<Customer> => {
	const { data: customer } = await api.post<Customer>('/customers', data);
	return customer;
};

export const getCustomerFn = async (id?: string): Promise<Customer> => {
	const { data } = await api.get<Customer>(`/customers/${id}`);
	return data;
};

export const updateCustomerFn = async (data: Customer): Promise<Customer> => {
	const { data: customer } = await api.put<Customer>(
		`/customers/${data.id}`,
		data,
	);
	return customer;
};
