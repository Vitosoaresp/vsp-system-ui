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
	placeholder?: string;
};

export function RhfTextField<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
>({
	error,
	name,
	label,
	control,
	type,
	placeholder,
	defaultValue,
	disabled,
	...rest
}: Props<TFieldValues, TName>) {
	const {
		field: { onChange, value, ref, ...props },
	} = useController({ control, name, defaultValue });

	return (
		<div>
			<Label className='text-zinc-100' htmlFor={name}>
				{label}
			</Label>
			<Input
				value={value}
				onChange={onChange}
				id={name}
				placeholder={placeholder}
				disabled={disabled}
				type={type}
				ref={ref}
				{...props}
				{...rest}
			/>
			{error?.message && (
				<p className='text-sm text-red-500'>{error.message}</p>
			)}
		</div>
	);
}
