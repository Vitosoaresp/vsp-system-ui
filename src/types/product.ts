import { ApiPaginationResponse } from './common';
import { Supplier } from './supplier';

export interface Product {
	id?: string;
	active: boolean;
	code: number;
	name: string;
	description?: string;
	grossPrice: number;
	salesPrice: number;
	quantity: number;
	supplierId: string;
	supplier?: Supplier;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
}

export interface IListProductResponse extends ApiPaginationResponse<Product> {}
