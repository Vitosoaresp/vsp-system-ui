import { ApiListResponse } from './common';
import { Product } from './product';
import { Supplier } from './supplier';

export interface Buy {
  supplierId: string;
  products: Partial<Product>[];
}

export interface PayPayable {
  id?: string;
  paidAt: string;
  amountPaid: number;
  generateDuplicate: boolean;
  remaningAmount?: number;
}

export interface AccountPayable {
  id?: string;
  supplierId: string;
  amount: number;
  status: string;
  dueDate: string;
  paidAt: string;
  tagId: string;
  isDuplicated: boolean;
  duplicatedRefer: string;
  amountPaid: number;
  tag: unknown;
  supplier: Supplier;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IListPayablesResponse extends ApiListResponse<AccountPayable> {}
