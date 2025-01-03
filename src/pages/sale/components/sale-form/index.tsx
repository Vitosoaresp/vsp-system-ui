import { Grid } from '@/components/grid';
import { RhfDatePicker } from '@/components/rhf/date-picker';
import { RhfSelect } from '@/components/rhf/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { listCustomersFn } from '@/service/customer';
import { Product } from '@/types/product';
import { SalePayload } from '@/types/sale';
import { formatCurrency, getCustomerName } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { CircleDollarSign } from 'lucide-react';
import { useCallback, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TableProducts } from './components';
import { SelectProducts } from './components/select-products';
import { saleSchema } from './schema';

interface SaleFormProps {
  onSubmit: (data: SalePayload) => void;
  isLoading?: boolean;
}

export const SaleForm = ({ onSubmit, isLoading }: SaleFormProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const methods = useForm<SalePayload>({
    resolver: yupResolver(saleSchema),
    mode: 'onBlur',
  });
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = methods;

  const watchedProducts = watch('items');
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleRemoveProduct = (index: number) => remove(index);

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => listCustomersFn(),
    select: data =>
      data.data.map(customer => ({
        label: getCustomerName(customer),
        value: String(customer.id),
      })),
  });

  const handleBack = () => navigate('/vendas');

  const handleToggleProduct = (product: Product) => {
    const index = selectedProducts.findIndex(p => p.id === product.id);

    if (index === -1) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      const newSelectedProducts = selectedProducts.filter(p => p.id !== product.id);
      setSelectedProducts(newSelectedProducts);
    }
  };

  const handleAppendProducts = useCallback(() => {
    selectedProducts.forEach(product => {
      const alreadySelected = watchedProducts.some(
        p => p.productId === String(product.id),
      );
      if (!alreadySelected) {
        append({
          productId: String(product.id),
          name: product.name,
          code: product.code,
          quantity: 1,
          maxQuantity: product.quantity,
          price: product.salesPrice,
          total: product.salesPrice,
        });
      }
    });
  }, [selectedProducts, watchedProducts, append]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="h-20">
          <RhfDatePicker
            control={control}
            name="saleDate"
            label="Data da Venda"
            error={errors.saleDate}
            mode="single"
            className="md:col-span-1 col-span-3"
            defaultValue={new Date().toISOString()}
          />
          <RhfSelect
            control={control}
            name="customerId"
            label="Cliente"
            error={errors.customerId}
            defaultValue=""
            options={customers || []}
            className="md:col-span-1 col-span-3"
          />
        </Grid>

        <TableProducts
          handleRemoveProduct={handleRemoveProduct}
          products={fields}
        />

        <SelectProducts
          handleAppendProducts={handleAppendProducts}
          handleToggleProduct={handleToggleProduct}
          selectedProducts={selectedProducts}
        />

        <h2 className="text-zinc-50 text-xl font-medium mt-10 flex items-center">
          <CircleDollarSign className="text-zinc-50 mr-3" />
          Total
        </h2>

        <Grid>
          <Input
            disabled
            value={formatCurrency(
              watchedProducts?.reduce(
                (acc, field) => acc + field.price * field.quantity,
                0,
              ),
            )}
          />
        </Grid>

        <div className="flex justify-end mt-5 space-x-3">
          <Button type="button" onClick={handleBack}>
            Cancelar
          </Button>
          <Button loading={isLoading} variant="outline" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
