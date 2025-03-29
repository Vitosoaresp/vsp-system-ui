import { Grid } from '@/components/grid';
import { RhfSelect } from '@/components/rhf/select';
import { RhfCheckbox } from '@/components/rhf/switch';
import { RhfTextField } from '@/components/rhf/text-field';
import { Button } from '@/components/ui/button';
import { useListSuppliersQuery } from '@/services/supplier';
import { Product, ProductGeneralData } from '@/types/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { generalDataSchema } from '../../schema';

interface GeneralDataFormProps {
  isLoading?: boolean;
  handleBack: () => void;
  handleGeneralDataSubmit: (data: ProductGeneralData) => void;
  initialValues?: Product;
}

export const GeneralDataForm = ({
  handleBack,
  isLoading = false,
  handleGeneralDataSubmit,
  initialValues,
}: GeneralDataFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(generalDataSchema),
  });

  const { data } = useListSuppliersQuery({ perPage: 99999 });

  const suppliers =
    data?.data.map(supplier => ({
      label: supplier.name,
      value: supplier.id,
    })) ?? [];

  return (
    <form onSubmit={handleSubmit(handleGeneralDataSubmit)}>
      <div className="p-3 bg-muted rounded border border-border mt-4 dark:bg-background space-y-5">
        <RhfCheckbox
          control={control}
          name="active"
          label="Ativo"
          error={errors.active}
          defaultValue={true}
          className="col-span-3"
        />
        <Grid className="grid-cols-4">
          <RhfTextField
            type="text"
            control={control}
            name="name"
            label="Nome do produto"
            error={errors.name}
            defaultValue=""
            className="col-span-4 md:col-span-2"
          />

          <RhfSelect
            control={control}
            name="supplierId"
            label="Fornecedor"
            options={suppliers ?? []}
            error={errors.supplierId}
            className="col-span-4 md:col-span-2"
          />

          <RhfTextField
            type="number"
            control={control}
            name="code"
            label="Código"
            error={errors.code}
            defaultValue={0}
            className="col-span-4 md:col-span-1"
          />

          <RhfTextField
            type="number"
            control={control}
            name="quantity"
            label="Quantidade"
            error={errors.quantity}
            defaultValue={0}
            className="col-span-4 md:col-span-1"
          />

          <RhfTextField
            type="text"
            control={control}
            name="description"
            label="Descrição"
            error={errors.description}
            defaultValue=""
            className="col-span-4 md:col-span-2"
          />
        </Grid>

        <div className="flex space-x-3">
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
