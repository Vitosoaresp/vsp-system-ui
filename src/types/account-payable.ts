import { ApiListResponse } from './common';
import { Product } from './product';
import { Supplier } from './supplier';

export interface Buy {
  supplierId: string;
  products: Partial<Product>[];
}

export interface PayPayable {
  paidAt: string;
  amountPaid: number;
  generateDuplicate: boolean;
  remaningAmount?: number;
}

export interface AccountPayable {
  supplierId: string;
  amount: number;
  status: string;
  dueDate: string;
  paidAt: string;
  tagId: string;
  isDuplicated: true;
  duplicatedRefer: string;
  amountPaid: number;
  id: string;
  tag: unknown;
  supplier: Supplier;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IListPayablesResponse extends ApiListResponse<AccountPayable> {}
