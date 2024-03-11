import yup from '@/lib/yup';

export const payRecevableSchema = yup.object().shape({
	amountReceived: yup.number().required().moreThan(0),
	paidAt: yup.string().required(),
	generateDuplicate: yup.boolean().default(false),
	remaningAmount: yup.number().optional(),
});
