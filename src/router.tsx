import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateLayout } from './layouts/private-layout';
import { PublicLayout } from './layouts/public-layout';
import { CustomerPage } from './pages/customer';
import { CustomersPage } from './pages/customers';
import { LoginPage } from './pages/login';
import { ProductPage } from './pages/product';
import { ProductsPage } from './pages/products';
import { RegisterPage } from './pages/register';
import { SupplierPage } from './pages/supplier';
import { SuppliersPage } from './pages/suppliers';

export const Router = () => {
	const router = createBrowserRouter([
		{
			element: <PrivateLayout />,
			children: [
				{ path: '/', element: <div>Home</div> },
				{ path: '/products', element: <ProductsPage /> },
				{ path: '/product/:id?', element: <ProductPage /> },
				{ path: '/suppliers', element: <SuppliersPage /> },
				{ path: '/supplier/:id?', element: <SupplierPage /> },
				{ path: '/customers', element: <CustomersPage /> },
				{ path: '/customer/:id?', element: <CustomerPage /> },
			],
		},
		{
			element: <PublicLayout />,
			children: [
				{ path: '/signin', element: <LoginPage /> },
				{ path: '/register', element: <RegisterPage /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
};
