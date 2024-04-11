import { cn } from '@/lib/utils';
import {
	FieldError,
	FieldPath,
	FieldValues,
	UseControllerProps,
	useController,
} from 'react-hook-form';
import { Combobox, ComboboxProps } from '../combobox';
import { Label } from '../ui/label';

type Props<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
	T,
> = UseControllerProps<TFieldValues, TName> & {
	label: string;
	error?: FieldError;
	className?: string;
} & Omit<ComboboxProps<T>, 'value' | 'onChange'>;

export function RhfCombobox<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
	T,
>({
	error,
	name,
	label,
	control,
	defaultValue,
	disabled,
	className,
	options,
	...rest
}: Props<TFieldValues, TName, T>) {
	const {
		field: { onChange, value },
	} = useController({ control, name, defaultValue });

	return (
		<div className={cn('flex flex-col', className)}>
			<Label className="text-zinc-100 mb-1" htmlFor={name}>
				{label}
			</Label>
			<Combobox
				options={options}
				disabled={disabled}
				value={value}
				onChange={onChange}
				{...rest}
			/>
			{error?.message && (
				<p className="text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
}
