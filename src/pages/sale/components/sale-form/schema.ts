import yup from '@/lib/yup';
import { Items } from '@/types/sale';

export const saleSchema = yup
	.object()
	.shape({
		saleDate: yup.string().required(),
		customerId: yup.string().required(),
		userId: yup.string().optional(),
		total: yup.number().default(0),
		items: yup
			.array()
			.of(
				yup.object().shape({
					productId: yup.string().required(),
					maxQuantity: yup.number().required().min(1),
					quantity: yup
						.number()
						.required()
						.min(1)
						.max(yup.ref('maxQuantity'), 'Valor em  estoque excedido')
						.positive('Quantidade inválida'),
					price: yup.number().required().min(0),
					total: yup.number().required().min(0),
					name: yup.string().required(),
					code: yup.number().required(),
				}),
			)
			.min(1)
			.required(),
	})
	.transform(value => {
		const items: Items[] = value.items;
		return {
			...value,
			total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
		};
	});
