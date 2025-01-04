import { Building2 } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div className="h-screen flex flex-col justify-center min-w-full">
      <header className="container flex justify-center pb-5 -mt-20">
        <div className="flex gap-3 items-center">
          <Building2 size={32} className="text-foreground" />
          <div className="h-6 w-px bg-secondary" />
          <h1 className="text-foreground font-semibold">VSP System</h1>
        </div>
      </header>
      <main className="px-4">
        <Outlet />
      </main>
    </div>
  );
};
