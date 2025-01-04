import { Ref } from 'react';
import {
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { IMaskMixin } from 'react-imask';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

const TextMask = IMaskMixin(({ inputRef, ...props }) => (
  <Input ref={inputRef as Ref<HTMLInputElement>} {...props} />
));

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  label: string;
  type: string;
  disabled?: boolean;
  error?: FieldError;
  placeholder?: string;
  mask: string;
  className?: string;
  inputClassName?: string;
};

export function RhfTextMask<
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
  inputClassName,
  className,
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
        <TextMask
          value={value}
          onChange={onChange}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          inputRef={ref}
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
