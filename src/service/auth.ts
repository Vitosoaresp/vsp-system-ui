import { api } from '@/lib/api';
import { LoginPayload, LoginResponse, RegisterPayload } from '@/types/auth';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/auth/sign-in', payload);
  return data;
};

export const getMe = async (): Promise<AxiosResponse<User>> => {
  const data = await api.get<User>('/users/me');
  return data;
};

export const register = async (
  payload: RegisterPayload,
): Promise<RegisterPayload> => {
  const { data } = await api.post<RegisterPayload>('/auth/register', payload);
  return data;
};
