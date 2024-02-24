import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateLayout } from './layouts/private-layout';
import { PublicLayout } from './layouts/public-layout';
import { Login } from './pages/login';

export const Router = () => {
	const router = createBrowserRouter([
		{
			element: <PrivateLayout />,
			children: [
				{ path: '/', element: <div>Home</div> },
				{ path: '/products', element: <div>Produtos</div> },
			],
		},
		{
			element: <PublicLayout />,
			children: [
				{ path: '/home', element: <div>Home</div> },
				{ path: '/signin', element: <Login /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
};
