import { useLogin } from '@/hooks';
import { LogIn } from 'lucide-react';
import { Form } from './components/form';

export const LoginPage = () => {
  const { signIn, isLoading } = useLogin();

  return (
    <div className="max-w-sm mx-auto ring-2 ring-primary p-10 rounded w-full">
      <div className="flex items-center gap-3 mb-5 justify-between">
        <h2 className="text-foreground font-semibold">Login</h2>
        <LogIn className="text-foreground text-2xl" />
      </div>
      <Form onSubmit={signIn} isLoading={isLoading} />
    </div>
  );
};
