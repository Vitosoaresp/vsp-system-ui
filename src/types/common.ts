import { LucideIcon } from 'lucide-react';

export interface Meta {
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  perPage: number;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: Meta;
}

export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood: string;
  number: string;
}

export enum FinancialStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

export interface NavItem {
  Icon: LucideIcon;
  label: string;
  to?: string;
  childrens?: {
    Icon: LucideIcon;
    label: string;
    to: string;
  }[];
}
