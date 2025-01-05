import yup from '@/lib/yup';

export const generalDataSchema = yup.object().shape({
  active: yup.boolean().required(),
  name: yup.string().trim().required(),
  supplierId: yup.string().required(),
  code: yup.number().moreThan(0, 'Código invalido').required(),
  quantity: yup.number().moreThan(0).required(),
  description: yup.string().trim().optional(),
});

export const pricesSchema = yup.object().shape({
  grossPrice: yup.number().moreThan(0).required(),
  salesPrice: yup.number().moreThan(0).required(),
});
