import {
	FieldError,
	FieldPath,
	FieldValues,
	UseControllerProps,
	useController,
} from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
	label: string;
	type: string;
	disabled?: boolean;
	error?: FieldError;
};

const moneyFormatter = Intl.NumberFormat('pt-BR', {
	currency: 'BRL',
	currencyDisplay: 'symbol',
	currencySign: 'standard',
	style: 'currency',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export function RhfCurrencyField<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
>({
	error,
	name,
	label,
	control,
	type,
	defaultValue,
	disabled,
	...rest
}: Props<TFieldValues, TName>) {
	const {
		field: { onChange, value, ref, ...props },
	} = useController({ control, name, defaultValue });

	return (
		<div>
			<Label className="text-zinc-100" htmlFor={name}>
				{label}
			</Label>
			<div className="relative">
				<Input
					value={moneyFormatter.format(value)}
					onChange={({ target }) => {
						const onlyNumber = target.value.replace(/\D/g, '');
						onChange(Number(onlyNumber) / 100);
					}}
					id={name}
					disabled={disabled}
					type={type}
					ref={ref}
					{...props}
					{...rest}
				/>
			</div>
			{error?.message && (
				<p className="text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
}
