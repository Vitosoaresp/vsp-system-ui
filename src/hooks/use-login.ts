import AuthContext from '@/context/auth';
import { login } from '@/service/auth';
import { LoginPayload } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogin = () => {
	const navigate = useNavigate();
	const { signIn: handleSignIn } = useContext(AuthContext);

	const {
		mutateAsync: signIn,
		isPending: isLoading,
		data,
	} = useMutation({
		mutationFn: login,
	});

	const handleLogin = async (data: LoginPayload) => {
		try {
			const response = await signIn(data);
			handleSignIn(response);
			navigate('/');
			toast.success('Login realizado com sucesso!');
		} catch (error) {
			toast.error('Crendenciais inválidas!');
		}
	};

	return {
		signIn: handleLogin,
		isLoading,
		data,
	};
};
