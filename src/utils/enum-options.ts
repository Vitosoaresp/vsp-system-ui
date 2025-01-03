import { FinancialStatus } from '@/types/common';

export type Option<T> = {
	label: string;
	value: T;
};

export const receivableStatusOptions: Option<FinancialStatus>[] = [
	{ label: 'Pendente', value: FinancialStatus.PENDING },
	{ label: 'Pago', value: FinancialStatus.PAID },
	{ label: 'Cancelado', value: FinancialStatus.CANCELED },
];

export const getLabelByEnum = <T>(options: Option<T>[], value: T): string => {
	const option = options.find(option => option.value === value);
	return option?.label ?? '';
};
