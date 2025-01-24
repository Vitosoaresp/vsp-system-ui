import { RhfCurrencyField } from '@/components/rhf/currency-field';
import { RhfTextField } from '@/components/rhf/text-field';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import yup from '@/lib/yup';
import { Product } from '@/types/product';
import { Items } from '@/types/sale';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface EditProductProps {
  onSubmit: (data: Items) => void;
  initialValue: Product;
  onBack: () => void;
}

export const EditProduct = ({
  onSubmit,
  initialValue,
  onBack,
}: EditProductProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<Items>({
    defaultValues: {
      maxQuantity: initialValue.quantity,
      quantity: 0,
      name: initialValue.name,
      code: initialValue.code,
      productId: initialValue.id,
      price: initialValue.salesPrice,
      total: 0,
    },
    resolver: yupResolver(
      yup.object({
        productId: yup.string().required(),
        code: yup.number().required(),
        name: yup.string().required().required(),
        price: yup.number().positive().required(),
        quantity: yup
          .number()
          .min(1)
          .max(yup.ref('maxQuantity'), 'Valor em  estoque excedido')
          .required(),
        maxQuantity: yup.number().positive().required(),
        total: yup.number().required(),
      }),
    ),
  });

  const quantity = watch('quantity');
  const price = watch('price');

  useEffect(() => {
    const total = price * quantity;

    setValue('total', Number(total.toFixed(2)));
  }, [quantity, price, setValue]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3">
        <div className="flex lg:flex-row flex-col lg:gap-3 justify-between w-full">
          <RhfTextField
            control={control}
            name="name"
            disabled
            label="Nome do produto"
            type="text"
            defaultValue=""
            className="flex-1"
            error={errors.name}
          />

          <RhfTextField
            control={control}
            name="code"
            label="Código"
            type="number"
            disabled
            defaultValue={0}
            error={errors.code}
            className="flex-1"
          />
        </div>

        <div className="flex lg:flex-row flex-col gap-3 justify-between w-full">
          <RhfTextField
            control={control}
            name="maxQuantity"
            label="Em estoque"
            type="number"
            disabled
            defaultValue={0}
            className="flex-1"
            error={errors.maxQuantity}
          />
          <RhfCurrencyField
            control={control}
            name="total"
            label="Valor total"
            disabled
            defaultValue={0}
            className="flex-1"
            error={errors.total}
          />
        </div>

        <div className="flex lg:flex-row flex-col gap-3 justify-between w-full">
          <RhfCurrencyField
            control={control}
            name="price"
            label="Preço de venda"
            defaultValue={0}
            className="flex-1"
            error={errors.price}
          />

          <RhfTextField
            control={control}
            name="quantity"
            label="Quantidade"
            type="number"
            defaultValue={0}
            className="flex-1"
            error={errors.quantity}
          />
        </div>
      </div>

      <DialogFooter className="justify-between">
        <Button variant="ghost" onClick={onBack}>
          Voltar
        </Button>

        <Button type="submit">Adicionar</Button>
      </DialogFooter>
    </form>
  );
};
