import { Address, ApiListResponse } from './common';

export interface Supplier {
  id: string;
  active: boolean;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: Partial<Address>;
  createdAt?: string;
  updatedAt?: string;
  deleteAt?: string;
}

export interface IListSupplierResponse extends ApiListResponse<Supplier> {}
