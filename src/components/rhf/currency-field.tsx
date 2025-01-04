import { cn } from '@/lib/utils';
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
  disabled?: boolean;
  error?: FieldError;
  className?: string;
  inputClassName?: string;
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
  defaultValue,
  disabled,
  className,
  inputClassName,
  ...rest
}: Props<TFieldValues, TName>) {
  const {
    field: { onChange, value, ref, ...props },
  } = useController({ control, name, defaultValue });

  return (
    <div className={className}>
      <Label className="text-foreground" htmlFor={name}>
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
          type="text"
          ref={ref}
          className={cn('text-foreground', inputClassName)}
          {...props}
          {...rest}
        />
      </div>
      {error?.message && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
}
