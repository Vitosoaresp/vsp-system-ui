import AuthContext from '@/context/auth';
import { getMe } from '@/service/auth';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';

export const useMe = () => {
	const { setUser, user } = useContext(AuthContext);

	const { data } = useQuery({
		queryKey: ['me'],
		queryFn: getMe,
		select: (data) => data?.data,
		retry: 1,
	});

	useEffect(() => {
		if (data) {
			setUser(data);
		}
	}, [data, setUser]);

	return user;
};
