import { Customer } from '@/types/customer';

export const formatCurrency = (value: number) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
};

export const getCustomerName = (customer: Partial<Customer>): string =>
	`${customer.firstName} ${customer.lastName}`;
