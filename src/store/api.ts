import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';
import { RootState } from '.';

export const baseUrl: string = import.meta.env.VITE_API_URL as string;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).session.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
  paramsSerializer: params => {
    return queryString.stringify(params, { arrayFormat: 'bracket' });
  },
});

const customBaseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401 && args.url !== '/auth/sign-in') {
    window.location.href = '/entrar?redirect=' + window.location.pathname;
  }

  return result;
};

// Inicializa um serviço de API vazio para injetar endpoints conforme necessário
export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: [
    'Me',
    'User',
    'Product',
    'Customer',
    'Supplier',
    'Sale',
    'Account-Receivable',
    'Account-Payable',
  ],
  endpoints: () => ({}),
});
