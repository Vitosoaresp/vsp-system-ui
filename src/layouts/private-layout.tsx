import { AvatarMenu } from '@/components/avatar-menu';
import { LoadingLayout } from '@/components/loading-layout';
import { Sidebar } from '@/components/sidebar';
import { getMe } from '@/service/auth';
import { useQuery } from '@tanstack/react-query';
import { Building2 } from 'lucide-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateLayout = () => {
	const location = useLocation();
	const {
		data: user,
		isPending,
		isFetched,
	} = useQuery({
		queryKey: ['me'],
		queryFn: getMe,
		select: (data) => data?.data,
		retry: 1,
	});

	const loading = isPending || !isFetched;
	if (loading) {
		return <LoadingLayout />;
	}

	if (!user) {
		return <Navigate to='/signin' state={{ from: location.pathname }} />;
	}

	return (
		<>
			<header className='p-5 container flex justify-between'>
				<div className='flex gap-3 items-center'>
					<Building2 size={32} className='text-zinc-50' />
					<div className='h-6 w-px bg-zinc-500' />
					<h1 className='text-zinc-50 font-semibold'>VSP System</h1>
				</div>

				<div>
					<AvatarMenu user={user} />
				</div>
			</header>
			<main className='container'>
				<Sidebar />
				<Outlet />
			</main>
		</>
	);
};
