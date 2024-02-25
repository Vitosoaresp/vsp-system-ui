import yup from '@/lib/yup';

export const registerSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], 'As senhas devem ser iguais')
		.required(),
	name: yup.string().trim().required(),
});
