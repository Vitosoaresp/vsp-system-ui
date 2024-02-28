'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
	handleChange: (date?: DateRange) => void;
	value?: DateRange;
}

export function DateRangePicker({
	className,
	handleChange,
	value,
}: DateRangePickerProps) {
	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={'outline'}
						className={cn(
							'w-[300px] justify-start text-left font-normal bg-black hover:bg-zinc-700 text-zinc-400 hover:text-zinc-50',
							!value && 'text-muted-foreground',
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{value?.from ? (
							value.to ? (
								<>
									{format(value.from, 'LLL dd, y')} -{' '}
									{format(value.to, 'LLL dd, y')}
								</>
							) : (
								format(value.from, 'LLL dd, y')
							)
						) : (
							<span>Selecione um período</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						className="bg-zinc-950 text-zinc-50"
						defaultMonth={new Date()}
						selected={value}
						onSelect={handleChange}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
