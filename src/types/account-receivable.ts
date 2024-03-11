import { ApiPaginationResponse } from './common';

export enum AccountReceivableStatus {
	PENDING = 'pending',
	PAID = 'paid',
	CANCELED = 'canceled',
}

export interface AccountReceivable {
	id?: string;
	saleId: number;
	status: AccountReceivableStatus;
	amount: number;
	amountReceived?: number;
	duoDate: string;
	createdAt: string;
	duplicatedRefer?: string;
	installmentNumber: number;
	paidAt?: string;
	isDuplicated: boolean;
	paymentType?: string;
	tagId?: string;
}

export interface PayReceivable {
	id?: string;
	paidAt: string;
	amountReceived: number;
	generateDuplicate: boolean;
	remaningAmount?: number;
}

export interface IListReceivableResponse
	extends ApiPaginationResponse<AccountReceivable> {}
