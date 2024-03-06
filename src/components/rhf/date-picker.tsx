import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
	FieldError,
	FieldPath,
	FieldValues,
	UseControllerProps,
	useController,
} from 'react-hook-form';
import { Button } from '../ui/button';
import { Calendar, CalendarProps } from '../ui/calendar';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Props<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
	label: string;
	disabled?: boolean;
	error?: FieldError;
	className?: string;
} & CalendarProps;

export function RhfDatePicker<
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
		<div className={cn(className)} ref={ref}>
			<Label className="text-zinc-100" htmlFor={name}>
				{label}
			</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={'outline'}
						className={cn(
							'w-[300px] block justify-start text-left font-normal bg-black hover:bg-zinc-800 text-zinc-300 hover:text-zinc-50',
							!value && 'text-zinc-50',
						)}
					>
						{value ? (
							format(value, 'dd/MM/yyyy')
						) : (
							<span>Selecione uma data</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-1 bg-black">
					<Calendar
						onDayClick={value => {
							onChange(new Date(value).toISOString());
						}}
						selected={value}
						disabled={disabled}
						{...props}
						{...rest}
					/>
				</PopoverContent>
			</Popover>
			{error?.message && (
				<p className="text-sm text-red-500">{error.message}</p>
			)}
		</div>
	);
}
