import yup from '@/lib/yup';
import { CNPJValidation } from '@/utils/validation';

export const customerSchema = yup.object().shape({
	id: yup.string().optional(),
	firstName: yup.string().trim().required(),
	lastName: yup.string().trim().required(),
	email: yup.string().email().required(),
	active: yup.boolean().required(),
	cpf: yup
		.string()
		.test('cpf', 'CPF inválido', cpf => (cpf ? CNPJValidation(cpf) : true))
		.optional(),
	cnpj: yup
		.string()
		.test('cnpj', 'CNPJ inválido', cnpj => (cnpj ? CNPJValidation(cnpj) : true))
		.optional(),
	phone: yup.string().required().min(15),
	address: yup.object().shape({
		id: yup.string().optional(),
		street: yup.string().optional(),
		number: yup.string().optional(),
		city: yup.string().optional(),
		state: yup.string().optional(),
		zipCode: yup.string().optional(),
		neighborhood: yup.string().optional(),
	}),
});
