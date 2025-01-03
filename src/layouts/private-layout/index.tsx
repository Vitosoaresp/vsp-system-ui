import { SidebarProvider } from '@/components/ui/sidebar';
import { getToken } from '@/lib/secure-storage';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './components/sidebar';

export const PrivateLayout = () => {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/entrar" state={{ from: location.pathname }} />;
  }

  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
