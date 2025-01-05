import { Grid } from '@/components/grid';
import { RhfCurrencyField } from '@/components/rhf/currency-field';
import { Button } from '@/components/ui/button';
import { Product, ProductPrices } from '@/types/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { pricesSchema } from '../../schema';

interface PricesFormProps {
  isLoading?: boolean;
  handleBack: () => void;
  handlePricesSubmit: (data: ProductPrices) => void;
  initialValues?: Product;
}

export const PricesForm = ({
  handleBack,
  isLoading = false,
  initialValues,
  handlePricesSubmit,
}: PricesFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductPrices>({
    defaultValues: {
      grossPrice: initialValues?.grossPrice,
      salesPrice: initialValues?.salesPrice,
    },
    resolver: yupResolver(pricesSchema),
  });

  return (
    <form onSubmit={handleSubmit(handlePricesSubmit)}>
      <div className="p-3 bg-muted rounded border border-border mt-4 dark:bg-background">
        <Grid className="grid-cols-4">
          <RhfCurrencyField
            control={control}
            name="grossPrice"
            label="Preço de compra"
            error={errors.grossPrice}
            defaultValue={0}
            className="col-span-4 md:col-span-2"
          />

          <RhfCurrencyField
            control={control}
            name="salesPrice"
            label="Preço de venda"
            error={errors.salesPrice}
            defaultValue={0}
            className="col-span-4 md:col-span-2"
          />
        </Grid>

        <div className="flex mt-5 space-x-3">
          <Button loading={isLoading} variant="outline" type="submit">
            Salvar
          </Button>
          <Button variant="outline" type="button" onClick={handleBack}>
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};
