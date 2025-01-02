import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Option } from '@/utils/enum-options';
import { CommandLoading } from 'cmdk';

export interface ComboboxProps<T> {
	options: Option<T>[];
	disabled?: boolean;
	value?: string;
	onChange: (value: string) => void;
	loading?: boolean;
}

export function Combobox<T>({
	options,
	disabled = false,
	onChange,
	value,
	loading = false,
}: ComboboxProps<T>) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');

	const filteredOptions =
		options?.filter(option =>
			option.label.toLowerCase().includes(search.toLowerCase()),
		) ?? [];

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="default"
					role="combobox"
					aria-expanded={open}
					className="justify-between px-3 gap-5 normal-case"
				>
					{value
						? options.find(option => option.value === value)?.label
						: 'Selecione uma opção'}
					<ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="xl:w-[429px] w-80 p-0">
				<Command className="bg-zinc-950" shouldFilter={false} value={value}>
					<CommandInput
						placeholder="Procurar ..."
						className="text-zinc-50 w-full"
						disabled={disabled}
						value={search}
						onValueChange={setSearch}
					/>
					<CommandList>
						<CommandEmpty>Nenhuma opção encontrada</CommandEmpty>
						{loading && (
							<CommandLoading>
								<div className="flex items-center justify-center py-3">
									<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-zinc-100" />
								</div>
							</CommandLoading>
						)}
						<CommandGroup className="bg-zinc-950">
							{filteredOptions.map(option => (
								<CommandItem
									key={`${option.value}`}
									value={`${option.value}`}
									onSelect={currentValue => {
										onChange(currentValue === value ? '' : currentValue);
										setOpen(false);
										setSearch('');
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === option.value ? 'opacity-100' : 'opacity-0',
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
