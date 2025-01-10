import { Search } from 'lucide-react';
import { Input, InputProps } from '../ui/input';

interface SearchBarProps extends Omit<InputProps, 'onChange'> {
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange, ...props }: SearchBarProps) => {
  return (
    <div className="relative lg:min-w-72 w-full">
      <Input value={value} onChange={e => onChange(e.target.value)} {...props} />
      <Search
        aria-label="Icone de busca"
        className="absolute right-2 pointer-events-none text-muted top-1/2 -translate-y-1/2"
      />
    </div>
  );
};
