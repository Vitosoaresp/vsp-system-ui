import { Option } from '@/utils/enum-options';
import {
	FieldError,
	FieldPath,
	FieldValues,
	UseControllerProps,
	useController,
} from 'react-hook-form';
import { Label } from '../ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

type Props<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
	label: string;
	options: Option[];
	disabled?: boolean;
	error?: FieldError;
	className?: string;
};

export function RhfSelect<
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
	options,
	...rest
}: Props<TFieldValues, TName>) {
	const {
		field: { onChange, value },
	} = useController({ control, name, defaultValue });

	return (
		<div className={className}>
			<Label className="text-zinc-100" htmlFor={name}>
				{label}
			</Label>
			<Select
				value={value}
				onValueChange={onChange}
				disabled={disabled}
				{...rest}
			>
				<SelectTrigger className="text-zinc-100">
					<SelectValue placeholder={label} />
				</SelectTrigger>
				<SelectContent className="bg-black text-zinc-100">
					{options.map(option => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{error?.message && (
				<p className="text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
}
