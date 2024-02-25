import { api } from '@/lib/api';
import { LoginPayload, LoginResponse, RegisterPayload } from '@/types/auth';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const TOKEN_KEY = `@${import.meta.env.VITE_APP_NAME}-token`;

export const getTokenKey = () => Cookies.get(TOKEN_KEY);

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
	const { data } = await api.post<LoginResponse>('/login', payload);
	return data;
};

export const setToken = (token: string) =>
	Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true });

export const logout = () => Cookies.remove(TOKEN_KEY);

export const getMe = async (): Promise<AxiosResponse<User>> => {
	const data = await api.get<User>('/users/me');
	return data;
};

export const register = async (
	payload: RegisterPayload,
): Promise<RegisterPayload> => {
	const { data } = await api.post<RegisterPayload>('/register', payload);
	return data;
};
