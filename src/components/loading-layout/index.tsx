import { Building2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export const LoadingLayout = () => {
	return (
		<>
			<div className='container flex items-start'>
				<aside className='h-screen border-r border-r-zinc-800 md:w-52 py-5 w-20'>
					<div className='flex gap-3 items-center mb-10'>
						<Building2 size={32} className='text-zinc-50' />
						<div className='h-6 w-px bg-zinc-500' />
						<h1 className='text-zinc-50 font-semibold'>VSP System</h1>
					</div>

					<nav className='flex flex-col pr-4 gap-2'>
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
					</nav>
				</aside>

				<div className='w-full flex justify-end px-4 py-8'>
					<Skeleton className='h-10 w-10 rounded-full bg-zinc-800' />
				</div>
			</div>
		</>
	);
};
