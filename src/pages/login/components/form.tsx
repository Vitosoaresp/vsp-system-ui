import { RhfTextField } from '@/components/rhf/text-field';
import { Button } from '@/components/ui/button';
import { LoginPayload } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../schema';

interface FormProps {
	onSubmit: (data: LoginPayload) => void;
	isLoading: boolean;
}

export const Form = ({ onSubmit, isLoading }: FormProps) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginPayload>({
		resolver: yupResolver(loginSchema),
	});

	return (
		<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
			<RhfTextField
				control={control}
				name='email'
				type='text'
				defaultValue=''
				label='E-mail'
				error={errors.email}
			/>

			<RhfTextField
				control={control}
				name='password'
				type='password'
				defaultValue=''
				label='Senha'
				error={errors.password}
			/>

			<div className='flex justify-end'>
				<Button
					type='button'
					variant='link'
					className='text-zinc-50 hover:underline'
					disabled={isLoading}
				>
					Registrar
				</Button>
				<Button
					type='submit'
					className='bg-zinc-50 text-zinc-900 hover:bg-zinc-300 w-24'
					loading={isLoading}
				>
					Entrar
				</Button>
			</div>
		</form>
	);
};
