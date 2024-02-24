import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './context/auth';
import { queryClient } from './lib/query-client';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Toaster />
				<App />
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
