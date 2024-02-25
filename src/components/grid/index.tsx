import { cn } from '@/lib/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Grid = ({ children, className, ...rest }: GridProps) => {
	return (
		<div className={cn('grid grid-cols-2 gap-6', className)} {...rest}>
			{children}
		</div>
	);
};
