import { getMe } from '@/service/auth';
import { UnauthorizedError } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';

export const useGetMe = () => {
	const { data, isPending, isFetched, error } = useQuery({
		queryKey: ['me'],
		queryFn: getMe,
		select: data => data?.data,
		retry: 1,
		refetchOnWindowFocus: 'always',
	});

	const err: UnauthorizedError = error as UnauthorizedError;

	return { data, isPending, isFetched, error: err };
};
