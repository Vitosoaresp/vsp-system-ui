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
		<main className="container flex items-stretch px-3">
			<Sidebar />
			<div className="min-h-screen w-full border-l border-l-zinc-800 ">
				<Outlet />
			</div>
		</main>
	);
};
