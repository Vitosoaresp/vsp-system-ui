import { useRegisterMutation } from '@/services/session';
import { Register } from '@/types/user';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Form } from './components/form';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSignUp = async (data: Register) => {
    try {
      await register(data).unwrap();
      toast.success('Cadastro realizado com sucesso!');
      navigate('/entrar');
    } catch {
      toast.error('Erro ao realizar cadastro!');
    }
  };

  return (
    <div className="max-w-sm mx-auto ring-2 ring-border p-10 rounded w-full">
      <div className="flex items-center gap-3 mb-5 justify-between">
        <h2 className="text-foreground font-semibold">Registre-se</h2>
        <UserPlus className="text-foreground text-2xl" />
      </div>
      <Form onSubmit={handleSignUp} isLoading={isLoading} />
    </div>
  );
};
