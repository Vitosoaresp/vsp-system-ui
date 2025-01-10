import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-media-query';
import { FinancialStatus } from '@/types/common';
import { CircleCheck, CircleEllipsis, CirclePlus, CircleX } from 'lucide-react';

const statuses = [
  {
    value: FinancialStatus.PAID,
    label: 'Pagos',
    icon: CircleCheck,
  },
  {
    value: FinancialStatus.PENDING,
    label: 'Pendentes',
    icon: CircleEllipsis,
  },
  {
    value: FinancialStatus.CANCELED,
    label: 'Cancelados',
    icon: CircleX,
  },
];

export function StatusCombobox({
  onChange,
  value = null,
}: {
  value?: FinancialStatus | null;
  onChange: (value: FinancialStatus | null) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const currentStatus = statuses.find(status => status.value === value) ?? null;

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="w-[150px] justify-start px-3"
          >
            {currentStatus && (
              <div className="flex gap-2 items-center">
                {<currentStatus.icon className="size-4" />}
                {currentStatus.label}
              </div>
            )}
            {!currentStatus && (
              <>
                <CirclePlus className="size-4 mr-2" /> Status
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={onChange}
            currentStatus={value}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg" className="w-[150px] justify-start">
          {currentStatus && (
            <div className="flex gap-2 items-center">
              {<currentStatus.icon className="size-4" />}
              {currentStatus.label}
            </div>
          )}
          {!currentStatus && (
            <>
              <CirclePlus className="size-4 mr-2" /> Status
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={onChange}
            currentStatus={value}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  currentStatus,
  emptyLabel = 'Nenhum resultado encontrado',
  placeholder = 'Filtrar por status...',
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: FinancialStatus | null) => void;
  currentStatus: string | null;
  emptyLabel?: string;
  placeholder?: string;
}) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyLabel}</CommandEmpty>
        <CommandGroup>
          {statuses.map(status => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={value => {
                setSelectedStatus(
                  value === currentStatus ? null : (value as FinancialStatus),
                );
                setOpen(false);
              }}
            >
              {<status.icon className="size-4 mr-2" />}
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
