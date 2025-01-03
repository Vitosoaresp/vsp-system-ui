import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { PrivateLayout } from './layouts/private-layout';
import { PublicLayout } from './layouts/public-layout';
import BuyPage from './pages/buy';
import { CustomerPage } from './pages/customer';
import { CustomersPage } from './pages/customers';
import { LoginPage } from './pages/login';
import { ProductPage } from './pages/product';
import { ProductsPage } from './pages/products';
import { ReceivablePage } from './pages/receivables';
import { RegisterPage } from './pages/register';
import { SalePage } from './pages/sale';
import { SalesPage } from './pages/sales';
import { SupplierPage } from './pages/supplier';
import { SuppliersPage } from './pages/suppliers';

export const Router = () => {
	const router = createBrowserRouter([
		{
			element: <PrivateLayout />,
			children: [
				{ path: '/', element: <Navigate to='/dashboard' /> },
				{ path: '/dashboard', element: <div>Dashboard</div> },
				{ path: '/produtos', element: <ProductsPage /> },
				{ path: '/produto/:id?', element: <ProductPage /> },
				{ path: '/fornecedores', element: <SuppliersPage /> },
				{ path: '/fornecedor/:id?', element: <SupplierPage /> },
				{ path: '/clientes', element: <CustomersPage /> },
				{ path: '/cliente/:id?', element: <CustomerPage /> },
				{ path: '/vendas', element: <SalesPage /> },
				{ path: '/venda/', element: <SalePage /> },
				{ path: '/contas-a-receber', element: <ReceivablePage /> },
				{ path: '/comprar', element: <BuyPage /> },
			],
		},
		{
			element: <PublicLayout />,
			children: [
				{ path: '/entrar', element: <LoginPage /> },
				{ path: '/registrar', element: <RegisterPage /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
};
