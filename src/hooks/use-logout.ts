import AuthContext from '@/context/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogout = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/signin');
		toast.success('Você saiu da sua conta!', {
			action: {
				label: 'Fechar',
				onClick: () => toast.dismiss(),
			},
		});
	};

	return handleLogout;
};
