import { cn } from '@/lib/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Grid = ({ children, className, ...rest }: GridProps) => {
	return (
		<div className={cn('grid grid-cols-3 gap-6', className)} {...rest}>
			{children}
		</div>
	);
};
