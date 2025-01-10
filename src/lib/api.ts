import axios from 'axios';
import { toast } from 'sonner';
import { getToken } from './secure-storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

api.interceptors.request.use(config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  err => {
    if (err.response?.status === 401 && window.location.pathname !== '/entrar') {
      toast('Sessão expirada, Faça o login novamente.');
      setTimeout(() => {
        const pathname = window.location.pathname;
        window.location.href = `/entrar?redirect=${pathname}`;
      }, 900);
    }

    return Promise.reject(err);
  },
);
