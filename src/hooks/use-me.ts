import AuthContext from '@/context/auth';
import { useContext } from 'react';

export const useMe = () => {
	const { user } = useContext(AuthContext);

	return user;
};
