import { LoadingLayout } from '@/components/loading-layout';
import { Sidebar } from '@/components/sidebar';
import { getMe } from '@/service/auth';
import { useQuery } from '@tanstack/react-query';
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
		<main className='container flex items-start'>
			<Sidebar />
			<Outlet />
		</main>
	);
};
