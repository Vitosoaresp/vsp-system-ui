import { Grid } from '@/components/grid';
import { Skeleton } from '@/components/ui/skeleton';

export const SupplierSkeleton = () => {
	return (
		<>
			<Grid>
				<Skeleton className="bg-zinc-800 h-8" />
				<Skeleton className="bg-zinc-800 h-8" />
				<Skeleton className="bg-zinc-800 h-8" />
				<Skeleton className="bg-zinc-800 h-8" />
				<Skeleton className="bg-zinc-800 h-8" />
				<Skeleton className="bg-zinc-800 h-8" />
				<Skeleton className="bg-zinc-800 h-8" />
				<Skeleton className="bg-zinc-800 h-8" />
				<Skeleton className="bg-zinc-800 h-8" />
				<Skeleton className="bg-zinc-800 h-8" />
			</Grid>

			<div className="flex justify-end mt-5">
				<Skeleton className="h-9 w-16 rounded-md bg-zinc-800" />
			</div>
		</>
	);
};
