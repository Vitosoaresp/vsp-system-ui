import { AxiosError } from 'axios';
import { User } from './user';

export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	user: User;
}

export interface RegisterPayload {
	email: string;
	password: string;
	passwordConfirmation: string;
	name: string;
}

export type UnauthorizedError = AxiosError<{ error: string }>;
