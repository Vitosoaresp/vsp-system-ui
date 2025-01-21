import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

export interface SessionState {
  user: User | null;
  token: string | null;
}

const initialState: SessionState = {
  user: null,
  token: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logout, setSession } = sessionSlice.actions;

export default sessionSlice.reducer;
