import AuthContext from '@/context/auth';
import { login } from '@/service/auth';
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
		onSuccess: data => {
			navigate('/');
			toast.success('Login realizado com sucesso!');
			handleSignIn(data);
		},
		onError: () => {
			toast.error('Crendenciais inválidas!');
		},
	});

	return {
		signIn,
		isLoading,
		data,
	};
};
