import { useLogin } from '@/hooks';
import { LogIn } from 'lucide-react';
import { Form } from './components/form';

export const Login = () => {
	const { signIn, isLoading } = useLogin();

	return (
		<div className='max-w-sm mx-auto ring-2 ring-zinc-900 p-10 rounded w-full'>
			<div className='flex items-center gap-3 mb-5 justify-between'>
				<h2 className='text-zinc-200 font-semibold'>Login</h2>
				<LogIn className='text-zinc-200 text-2xl' />
			</div>
			<Form onSubmit={signIn} isLoading={isLoading} />
		</div>
	);
};
