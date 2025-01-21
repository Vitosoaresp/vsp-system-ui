import { api } from '@/store/api';
import { Credentials, LoginResponse, Register, User } from '@/types/user';

export const sessionApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, Credentials>({
      query: credentials => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<User, Register>({
      query: register => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: register,
      }),
    }),
    me: builder.query<User, void>({
      query: () => ({
        url: '/users/me',
      }),
      providesTags: () => [{ type: 'Me' }],
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useRegisterMutation } = sessionApi;
