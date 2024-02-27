import { LoadingLayout } from '@/components/loading-layout';
import { Sidebar } from '@/components/sidebar';
import { useGetMe } from '@/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateLayout = () => {
	const location = useLocation();
	const { data: user, isFetched, isPending, error } = useGetMe();

	const loading = isPending || !isFetched;
	if (loading) {
		return <LoadingLayout />;
	}

	if (!user || error?.response?.data?.error === 'Invalid token') {
		return <Navigate to="/signin" state={{ from: location.pathname }} />;
	}

	return (
		<main className="min-h-screen md:pl-64 pl-20">
			<Sidebar />
			<div className="relative w-full">
				<Outlet />
			</div>
		</main>
	);
};
