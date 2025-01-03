import { getUser, logout, setToken, setUser } from '@/lib/secure-storage';
import { LoginResponse } from '@/types/auth';
import { User } from '@/types/user';
import { createContext, useCallback, useMemo, useState } from 'react';

interface AuthContext {
  user: User | null;
  setUser: (user: User) => void;
  signIn: (data: LoginResponse) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  signIn: () => {},
  logout: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setCurrentUser] = useState<User | null>(getUser());

  const signIn = useCallback((data: LoginResponse) => {
    setToken(data.token);
    setUser(data.user);
    setCurrentUser(data.user);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, []);

  const value: AuthContext = useMemo(
    () => ({ user, signIn, logout: handleLogout, setUser }),
    [user, handleLogout, signIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
