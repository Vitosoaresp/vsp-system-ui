import { SidebarProvider } from '@/components/ui/sidebar';
import { useMeQuery } from '@/services/session';
import { LoaderCircle } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/sidebar';

export const PrivateLayout = () => {
  const { data: user } = useMeQuery();

  return (
    <>
      {user && (
        <SidebarProvider>
          <Sidebar />
          <main className="w-full xl:py-10 xl:px-20 p-8">
            <Outlet />
          </main>
        </SidebarProvider>
      )}
      {!user && (
        <main className="flex items-center justify-center h-screen">
          <LoaderCircle className="size-10 text-primary animate-spin" />
        </main>
      )}
    </>
  );
};
