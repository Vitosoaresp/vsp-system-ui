import { ApiPaginationResponse } from './common';
import { Customer } from './customer';
import { User } from './user';

interface Items {
	productId: string;
	quantity: number;
	price: number;
	total: number;
}

export interface SalePayload {
	customerId: string;
	userId: string;
	items: Items[];
	total: number;
	installmentValue: number;
	installmentQuantity: number;
}

export interface Sale extends Omit<SalePayload, 'items'> {
	id: string;
	customer: Customer;
	user: User;
	SaleItem: {
		id: string;
		productId: string;
		quantity: number;
		price: number;
		total: number;
		createdAt: string;
		updatedAt: string;
	}[];
	status: string;
	createdAt: string;
	updatedAt: string;
	deleteAt?: string;
}

export interface IListSaleResponse extends ApiPaginationResponse<Sale> {}
