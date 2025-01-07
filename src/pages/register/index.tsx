import { useRegister } from '@/hooks';
import { UserPlus } from 'lucide-react';
import { Form } from './components/form';

export const RegisterPage = () => {
  const { handleRegister, isLoading } = useRegister();

  return (
    <div className="max-w-sm mx-auto ring-2 ring-border p-10 rounded w-full">
      <div className="flex items-center gap-3 mb-5 justify-between">
        <h2 className="text-foreground font-semibold">Registre-se</h2>
        <UserPlus className="text-foreground text-2xl" />
      </div>
      <Form onSubmit={handleRegister} isLoading={isLoading} />
    </div>
  );
};
