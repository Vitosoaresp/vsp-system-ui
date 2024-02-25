import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateLayout } from './layouts/private-layout';
import { PublicLayout } from './layouts/public-layout';
import { LoginPage } from './pages/login';
import { ProductsPage } from './pages/products';

export const Router = () => {
	const router = createBrowserRouter([
		{
			element: <PrivateLayout />,
			children: [
				{ path: '/', element: <div>Home</div> },
				{ path: '/products', element: <ProductsPage /> },
			],
		},
		{
			element: <PublicLayout />,
			children: [
				{ path: '/home', element: <div>Home</div> },
				{ path: '/signin', element: <LoginPage /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
};
