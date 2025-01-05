import { AccountReceivable } from './account-receivable';
import { ApiPaginationResponse } from './common';
import { Customer } from './customer';
import { Product, ProductHistory } from './product';
import { User } from './user';

export interface Items {
  productId: string;
  name: string;
  code: number;
  maxQuantity: number;
  quantity: number;
  price: number;
  total: number;
}

export interface SalePayload {
  customerId: string;
  userId?: string;
  items: Items[];
  total: number;
  saleDate: string;
}

export interface Sale extends Omit<SalePayload, 'items'> {
  id: number;
  customer: Customer;
  user: User;
  items: {
    id: string;
    productId: string;
    quantity: number;
    product?: Product;
    price: number;
    total: number;
    createdAt: string;
    updatedAt: string;
  }[];
  ProductHistory: ProductHistory;
  accountReceivable: AccountReceivable[];
  status: string;
  createdAt: string;
  updatedAt: string;
  deleteAt?: string;
}

export interface IListSaleResponse extends ApiPaginationResponse<Sale> {}
