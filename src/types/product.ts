import { ApiPaginationResponse } from './common';

export interface Product {
	id: string;
	code: number;
	name: string;
	description?: string;
	price: number;
	quantity: number;
	supplierId: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string;
}

export interface IListProductResponse extends ApiPaginationResponse<Product> {}
