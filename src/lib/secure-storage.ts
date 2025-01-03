import secureLocalStorage from 'react-secure-storage';

import { User } from '@/types/user';

import project from '../../package.json';

export const TOKEN_KEY = `${project.name}/@token`;
export const USER_KEY = `${project.name}/@user`;

export const isAuthenticated = () => secureLocalStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => secureLocalStorage.getItem(TOKEN_KEY) as string;
export const setToken = (value: string) =>
	secureLocalStorage.setItem(TOKEN_KEY, value);
export const removeToken = () => secureLocalStorage.removeItem(TOKEN_KEY);

export const setUser = (user: User) => secureLocalStorage.setItem(USER_KEY, user);
export const getUser = () => secureLocalStorage.getItem(USER_KEY) as User | null;
export const removeUser = () => secureLocalStorage.removeItem(USER_KEY);

export const logout = () => {
	removeToken();
	removeUser();
};
