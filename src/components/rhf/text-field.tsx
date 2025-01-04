import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
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
  StartAdornment?: LucideIcon;
  EndAdornment?: LucideIcon;
  handleClickAdornment?: () => void;
  className?: string;
  inputClassName?: string;
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
  EndAdornment,
  StartAdornment,
  className,
  handleClickAdornment,
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
        {StartAdornment && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            {
              <StartAdornment
                onClick={handleClickAdornment}
                className="text-secondary cursor-pointer"
              />
            }
          </span>
        )}
        <Input
          value={value}
          onChange={onChange}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          ref={ref}
          className={cn(!!error ? 'border-destructive' : '', inputClassName)}
          {...props}
          {...rest}
        />
        {EndAdornment && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            {
              <EndAdornment
                className="text-secondary cursor-pointer"
                onClick={handleClickAdornment}
              />
            }
          </span>
        )}
      </div>
      {error?.message && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
}
