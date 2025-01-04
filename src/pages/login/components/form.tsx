import { RhfTextField } from '@/components/rhf/text-field';
import { Button } from '@/components/ui/button';
import { LoginPayload } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { loginSchema } from '../schema';

interface FormProps {
  onSubmit: (data: LoginPayload) => void;
  isLoading: boolean;
}

export const Form = ({ onSubmit, isLoading }: FormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(prev => !prev);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <RhfTextField
        control={control}
        name="email"
        type="text"
        defaultValue=""
        label="E-mail"
        error={errors.email}
      />

      <RhfTextField
        control={control}
        name="password"
        type={showPassword ? 'text' : 'password'}
        defaultValue=""
        label="Senha"
        error={errors.password}
        EndAdornment={showPassword ? EyeOff : Eye}
        handleClickAdornment={handleTogglePassword}
      />

      <div className="flex justify-end">
        <Button
          type="button"
          variant="link"
          className="hover:underline"
          disabled={isLoading}
        >
          <Link to="/register">Registrar</Link>
        </Button>
        <Button type="submit" className="w-24" loading={isLoading}>
          Entrar
        </Button>
      </div>
    </form>
  );
};
