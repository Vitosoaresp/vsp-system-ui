import { RhfTextField } from '@/components/rhf/text-field';
import { Button } from '@/components/ui/button';
import { RegisterPayload } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { registerSchema } from '../schema';

interface FormProps {
	onSubmit: (data: RegisterPayload) => void;
	isLoading: boolean;
}

export const Form = ({ onSubmit, isLoading }: FormProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirmation, setShowPasswordConfirmation] =
		useState(false);
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<RegisterPayload>({
		resolver: yupResolver(registerSchema),
	});

	const handleTogglePassword = () => setShowPassword(prev => !prev);
	const handleTogglePasswordConfirmation = () =>
		setShowPasswordConfirmation(prev => !prev);

	return (
		<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<RhfTextField
				control={control}
				name="name"
				type="text"
				defaultValue=""
				label="Nome"
				error={errors.name}
			/>

			<RhfTextField
				control={control}
				name="email"
				type="text"
				defaultValue=""
				label="E-mail"
				error={errors.email}
			/>

			<RhfTextField
				control={control}
				name="password"
				type={showPassword ? 'text' : 'password'}
				defaultValue=""
				label="Senha"
				error={errors.password}
				EndAdornment={showPassword ? EyeOff : Eye}
				handleClickAdornment={handleTogglePassword}
			/>

			<RhfTextField
				control={control}
				name="passwordConfirmation"
				type={showPasswordConfirmation ? 'text' : 'password'}
				defaultValue=""
				label="Confirmação de senha"
				error={errors.passwordConfirmation}
				EndAdornment={showPasswordConfirmation ? EyeOff : Eye}
				handleClickAdornment={handleTogglePasswordConfirmation}
			/>

			<div className="flex justify-end">
				<Button
					type="button"
					variant="link"
					className="text-zinc-50 hover:underline"
					disabled={isLoading}
				>
					<Link to="/signin">Já tem uma conta?</Link>
				</Button>
				<Button
					type="submit"
					className="bg-zinc-50 text-zinc-900 hover:bg-zinc-300 w-24"
					loading={isLoading}
				>
					Registrar
				</Button>
			</div>
		</form>
	);
};
