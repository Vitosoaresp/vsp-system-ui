import yup from '@/lib/yup';
import { CNPJValidation } from '@/utils/validation';

export const supplierSchema = yup.object().shape({
	id: yup.string().optional(),
	name: yup.string().required(),
	email: yup.string().email().required(),
	active: yup.boolean().required(),
	cnpj: yup
		.string()
		.test('cnpj', 'CNPJ inválido', cnpj => !!cnpj && CNPJValidation(cnpj))
		.required(),
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
