import { AccountReceivableStatus } from '@/types/account-receivable';

export type Option<T> = {
	label: string;
	value: T;
};

export const receivableStatusOptions: Option<AccountReceivableStatus>[] = [
	{ label: 'Pendente', value: AccountReceivableStatus.PENDING },
	{ label: 'Pago', value: AccountReceivableStatus.PAID },
	{ label: 'Cancelado', value: AccountReceivableStatus.CANCELED },
];

export const getLabelByEnum = <T>(options: Option<T>[], value: T): string => {
	const option = options.find(option => option.value === value);
	return option?.label ?? '';
};
