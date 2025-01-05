import { Customer } from '@/types/customer';

export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions,
) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    ...options,
  }).format(value);
};

export const getCustomerName = (customer: Partial<Customer>): string =>
  `${customer.firstName} ${customer.lastName}`;
