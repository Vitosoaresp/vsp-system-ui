import { Address, ApiPaginationResponse } from './common';

export interface Customer {
  id: string;
  active: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cnpj?: string;
  cpf?: string;
  address: Address;
  createdAt?: string;
  updatedAt?: string;
  deleteAt?: string;
}

export interface CustomerPayload extends Omit<Customer, 'id'> {}

export interface IListCustomerResponse extends ApiPaginationResponse<Customer> {}
