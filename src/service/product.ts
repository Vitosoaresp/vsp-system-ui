import { ListParams } from '@/hooks';
import { api } from '@/lib/api';
import { IListProductResponse } from '@/types/product';

export const getProducts = async (
	params?: ListParams,
): Promise<IListProductResponse> => {
	const { data } = await api.get<IListProductResponse>('/products', { params });
	return data;
};
