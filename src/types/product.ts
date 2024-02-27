import { ApiPaginationResponse } from './common';
import { Supplier } from './supplier';

export interface ProductHistory {
	id: string;
	productId: string;
	quantity: number;
	grossPrice: number;
	salesPrice: number;
	action: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

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
	ProductHistory?: ProductHistory[];
}

export interface IListProductResponse extends ApiPaginationResponse<Product> {}
