import { logout, setToken } from '@/service/auth';
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
	const [user, setUser] = useState<User | null>(null);

	const signIn = useCallback((data: LoginResponse) => {
		setToken(data.token);
		setUser(data.user);
	}, []);

	const handleLogout = useCallback(() => {
		logout();
		setUser(null);
	}, []);

	const value: AuthContext = useMemo(
		() => ({ user, signIn, logout: handleLogout, setUser }),
		[user, handleLogout, signIn],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
