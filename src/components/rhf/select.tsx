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
  T,
> = UseControllerProps<TFieldValues, TName> & {
  label: string;
  options: Option<T>[];
  disabled?: boolean;
  error?: FieldError;
  className?: string;
};

export function RhfSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T,
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
}: Props<TFieldValues, TName, T>) {
  const {
    field: { onChange, value },
  } = useController({ control, name, defaultValue });

  return (
    <div className={className}>
      <Label className="text-foreground" htmlFor={name}>
        {label}
      </Label>
      <Select value={value} onValueChange={onChange} disabled={disabled} {...rest}>
        <SelectTrigger className="text-foreground">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className="bg-background text-foreground">
          {options.map(option => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
          {!options.length && (
            <SelectItem disabled value="empty">
              Nenhuma opção disponivel
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      {error?.message && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
}
