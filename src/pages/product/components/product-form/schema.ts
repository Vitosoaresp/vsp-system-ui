import yup from '@/lib/yup';

export const productSchema = yup.object().shape({
	id: yup.string().optional(),
	code: yup.number().moreThan(0, 'Código invalido').required(),
	name: yup.string().trim().required(),
	active: yup.boolean().required(),
	supplierId: yup.string().required(),
	grossPrice: yup.number().moreThan(0).required(),
	salesPrice: yup.number().moreThan(0).required(),
	quantity: yup.number().moreThan(0).required(),
});
