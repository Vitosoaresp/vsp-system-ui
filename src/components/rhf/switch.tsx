import {
	FieldError,
	FieldPath,
	FieldValues,
	UseControllerProps,
	useController,
} from 'react-hook-form';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

type Props<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
	label: string;
	disabled?: boolean;
	error?: FieldError;
	className?: string;
};

export function RhfCheckbox<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
>({
	error,
	name,
	label,
	control,
	defaultValue,
	disabled,
	className,
	...rest
}: Props<TFieldValues, TName>) {
	const {
		field: { onChange, value, ref, ...props },
	} = useController({ control, name, defaultValue });

	return (
		<div className={className}>
			<div className="flex gap-2 items-center">
				<Switch
					className="data-[state=checked]:bg-blue-600"
					checked={value}
					onCheckedChange={onChange}
					id={name}
					disabled={disabled}
					ref={ref}
					{...props}
					{...rest}
				/>
				<Label className="text-zinc-100" htmlFor={name}>
					{label}
				</Label>
			</div>
			{error?.message && (
				<p className="text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
}
