import { getTokenKey } from '@/service/auth';
import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string,
});

api.interceptors.request.use((config) => {
	const token = getTokenKey();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
