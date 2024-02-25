import AuthContext from '@/context/auth';
import { getMe } from '@/service/auth';
import { UnauthorizedError } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';

export const useGetMe = () => {
	const { setUser, user } = useContext(AuthContext);

	const { data, isPending, isFetched, error } = useQuery({
		queryKey: ['me'],
		queryFn: getMe,
		select: data => data?.data,
		retry: 1,
		refetchOnWindowFocus: 'always',
	});

	useEffect(() => {
		if (data && !user) {
			setUser(data);
		}
	}, [data, setUser, user]);

	const err: UnauthorizedError = error as UnauthorizedError;

	return { data, isPending, isFetched, error: err };
};
