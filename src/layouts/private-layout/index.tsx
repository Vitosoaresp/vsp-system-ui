import { Sidebar } from '@/components/sidebar';
import { getToken } from '@/lib/secure-storage';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateLayout = () => {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/entrar" state={{ from: location.pathname }} />;
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
