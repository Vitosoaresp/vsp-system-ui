import { Grid } from '@/components/grid';
import { RhfDatePicker } from '@/components/rhf/date-picker';
import { RhfSelect } from '@/components/rhf/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetCustomersQuery } from '@/services/customer';
import { useMeQuery } from '@/services/session';
import { Product } from '@/types/product';
import { SalePayload } from '@/types/sale';
import { formatCurrency, getCustomerName } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { CircleDollarSign } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TableProducts } from './components';
import { CustomerDataForm } from './components/customer-data-form';
import { SelectProducts } from './components/select-products';
import { saleSchema } from './schema';

interface SaleFormProps {
  onSubmit: (data: SalePayload) => void;
  isLoading?: boolean;
}

export const SaleForm = ({ onSubmit, isLoading }: SaleFormProps) => {
  const { data: user } = useMeQuery();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const methods = useForm<SalePayload>({
    resolver: yupResolver(saleSchema),
    mode: 'onBlur',
    defaultValues: { userId: user?.id },
  });
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = methods;

  const watchedProducts = watch('items');
  const watchedCustomerId = watch('customerId');
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleRemoveProduct = (index: number) => remove(index);

  const { data } = useGetCustomersQuery({ perPage: 99999 });
  const customers = data?.data;

  const customerOptions =
    customers?.map(customer => ({
      label: getCustomerName(customer),
      value: String(customer.id),
    })) ?? [];

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

  const address = useMemo(
    () => customers?.find(customer => customer.id === watchedCustomerId)?.address,
    [watchedCustomerId, customers],
  );

  return (
    <FormProvider {...methods}>
      <form className="max-w-5xl" onSubmit={handleSubmit(onSubmit)}>
        <Grid className="h-20 grid-cols-4">
          <RhfDatePicker
            control={control}
            name="saleDate"
            label="Data da Venda"
            error={errors.saleDate}
            mode="single"
            className="md:col-span-2 col-span-4"
            defaultValue={new Date().toISOString()}
          />
          <RhfSelect
            control={control}
            name="customerId"
            label="Cliente"
            error={errors.customerId}
            defaultValue=""
            options={customerOptions}
            className="md:col-span-2 col-span-4"
          />
        </Grid>

        <CustomerDataForm address={address} />

        <TableProducts
          handleRemoveProduct={handleRemoveProduct}
          products={fields}
        />

        <SelectProducts
          handleAppendProducts={handleAppendProducts}
          handleToggleProduct={handleToggleProduct}
          selectedProducts={selectedProducts}
        />

        <h2 className="text-foreground text-xl font-medium mt-5 flex items-center">
          <CircleDollarSign className="text-foreground mr-3" />
          Financeiro
        </h2>

        <div className="col-span-3 mt-5">
          <Label>Total</Label>
          <Input
            disabled
            className="col-span-3"
            value={formatCurrency(
              watchedProducts?.reduce(
                (acc, field) => acc + field.price * field.quantity,
                0,
              ),
            )}
          />
        </div>

        <div className="flex mt-5 space-x-3">
          <Button loading={isLoading} variant="outline" type="submit">
            Salvar
          </Button>
          <Button type="button" variant="outline" onClick={handleBack}>
            Cancelar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
