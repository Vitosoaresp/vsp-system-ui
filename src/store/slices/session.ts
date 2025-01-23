import {
  getToken,
  getUser,
  removeToken,
  removeUser,
  setToken,
  setUser,
} from '@/lib/secure-storage';
import { sessionApi } from '@/services/session';
import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

export interface SessionState {
  user: User | null;
  token: string | null;
}

const localToken = getToken();
const localUser = getUser();

const initialState: SessionState = {
  user: localUser,
  token: localToken,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      removeToken();
      removeUser();
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      sessionApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        setToken(payload.token);
        setUser(payload.user);
      },
    );
  },
});

export const { logout } = sessionSlice.actions;

export default sessionSlice.reducer;
