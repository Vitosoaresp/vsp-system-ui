import { ProductAction } from '@/utils/enum';
import { ApiPaginationResponse } from './common';
import { Supplier } from './supplier';

export interface ProductHistory {
  id: string;
  productId: string;
  quantity: number;
  grossPrice: number;
  salesPrice: number;
  action: ProductAction;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ProductGeneralData {
  active: boolean;
  name: string;
  supplierId: string;
  code: number;
  quantity: number;
  description?: string;
}

export interface ProductPrices {
  grossPrice: number;
  salesPrice: number;
}

export interface Product extends ProductGeneralData, ProductPrices {
  id?: string;
  supplier?: Supplier;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  histories?: ProductHistory[];
}

export interface IListProductResponse extends ApiPaginationResponse<Product> {}
