import yup from '@/lib/yup';
import { CNPJValidation, CPFValidation } from '@/utils/validation';

export const customerSchema = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  email: yup.string().email().required(),
  active: yup.boolean().required(),
  cpf: yup
    .string()
    .test('cpf', 'CPF inválido', cpf => (cpf ? CPFValidation(cpf) : true))
    .optional(),
  cnpj: yup
    .string()
    .test('cnpj', 'CNPJ inválido', cnpj => (cnpj ? CNPJValidation(cnpj) : true))
    .optional(),
  phone: yup.string().required().min(15),
  address: yup
    .object()
    .shape({
      id: yup.string().optional(),
      street: yup.string().required(),
      number: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      zipCode: yup.string().required(),
      neighborhood: yup.string().required(),
    })
    .required(),
});
