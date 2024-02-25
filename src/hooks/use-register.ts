import { register } from '@/service/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useRegister = () => {
	const navigate = useNavigate();

	const {
		mutateAsync: handleRegister,
		isPending: isLoading,
		data,
	} = useMutation({
		mutationFn: register,
		onSuccess: () => {
			toast.success('Cadastro realizado com sucesso!');
			navigate('/signin');
		},
		onError: () => {
			toast.error('Erro ao realizar cadastro!');
		},
	});

	return {
		handleRegister,
		isLoading,
		data,
	};
};
