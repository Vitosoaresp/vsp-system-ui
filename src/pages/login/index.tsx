import { useLoginMutation } from '@/services/session';
import { Credentials } from '@/types/user';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Form } from './components/form';

const LoginPage = () => {
  const [signIn, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (data: Credentials) => {
    try {
      await signIn(data).unwrap();
      navigate('/dashboard');
      toast.success('Login realizado com sucesso!');
    } catch {
      toast.error('Erro ao fazer login, tente novamente mais tarde.');
    }
  };

  return (
    <div className="max-w-sm mx-auto ring-2 ring-primary p-10 rounded w-full">
      <div className="flex items-center gap-3 mb-5 justify-between">
        <h2 className="text-foreground font-semibold">Login</h2>
        <LogIn className="text-foreground text-2xl" />
      </div>
      <Form onSubmit={handleLogin} isLoading={isLoading} />
    </div>
  );
};

export default LoginPage;
