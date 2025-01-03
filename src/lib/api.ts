import axios from 'axios';
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

axios.interceptors.response.use(
  response => response,
  err => {
    if (err.response?.status === 401) {
      window.location.href = '/signin';
    }

    return Promise.reject(err);
  },
);
