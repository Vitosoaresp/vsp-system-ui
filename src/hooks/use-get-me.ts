import { getMe } from '@/service/auth';
import { useQuery } from '@tanstack/react-query';

export const useGetMe = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  return { data, isLoading };
};
