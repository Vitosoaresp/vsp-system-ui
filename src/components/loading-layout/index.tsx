import { Building2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export const LoadingLayout = () => {
	return (
		<>
			<header className='p-5 container flex justify-between'>
				<div className='flex gap-3 items-center'>
					<Building2 size={32} className='text-zinc-50' />
					<div className='h-6 w-px bg-zinc-500' />
					<h1 className='text-zinc-50 font-semibold'>VSP System</h1>
				</div>

				<div>
					<Skeleton className='h-10 w-10 rounded-full bg-zinc-800' />
				</div>
			</header>
			<main className='container'>
				<aside className='h-[85vh] border-r border-r-zinc-800 w-52 py-5'>
					<nav className='flex flex-col pr-4 gap-2'>
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
						<Skeleton className='h-11 py-2 px-4 rounded-md bg-zinc-800' />
					</nav>
				</aside>
			</main>
		</>
	);
};
