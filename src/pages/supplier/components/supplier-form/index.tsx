import { Grid } from '@/components/grid';
import { RhfCheckbox } from '@/components/rhf/switch';
import { RhfTextField } from '@/components/rhf/text-field';
import { RhfTextMask } from '@/components/rhf/text-mask';
import { Button } from '@/components/ui/button';
import { Supplier } from '@/types/supplier';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supplierSchema } from './schema';

interface SupplierFormProps {
  onSubmit: (data: Supplier) => void;
  initialValues?: Supplier;
  isLoading?: boolean;
}

export const SupplierForm = ({
  initialValues,
  onSubmit,
  isLoading,
}: SupplierFormProps) => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Supplier>({
    defaultValues: initialValues,
    resolver: yupResolver(supplierSchema),
  });

  const handleBack = () => navigate('/fornecedores');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <RhfCheckbox
          control={control}
          name="active"
          label="Ativo"
          error={errors.active}
          defaultValue={true}
          className="col-span-3"
        />

        <RhfTextField
          type="text"
          control={control}
          name="name"
          label="Nome"
          error={errors.name}
          defaultValue=""
          className="col-span-3 md:col-span-1"
        />

        <RhfTextField
          type="text"
          control={control}
          name="email"
          label="Email"
          error={errors.email}
          defaultValue=""
          className="col-span-3 md:col-span-1"
        />

        <RhfTextMask
          type="text"
          mask="00.000.000/0000-00"
          control={control}
          name="cnpj"
          label="CNPJ"
          error={errors.cnpj}
          defaultValue=""
          className="col-span-3 md:col-span-1"
        />

        <RhfTextMask
          type="text"
          control={control}
          name="phone"
          label="Telefone"
          error={errors.phone}
          defaultValue=""
          mask="(00) 00000-0000"
          className="col-span-3 md:col-span-1"
        />

        <RhfTextMask
          control={control}
          name="address.zipCode"
          label="CEP"
          error={errors.address?.zipCode}
          type="text"
          defaultValue=""
          mask="00000-000"
          className="col-span-3 md:col-span-1"
        />

        <RhfTextField
          type="text"
          control={control}
          name="address.city"
          label="Cidade"
          error={errors.address?.city}
          defaultValue=""
          className="col-span-3 md:col-span-1"
        />

        <RhfTextField
          type="text"
          control={control}
          name="address.street"
          label="Rua"
          error={errors.address?.street}
          defaultValue=""
          className="col-span-3 md:col-span-1"
        />

        <RhfTextField
          type="text"
          control={control}
          name="address.number"
          label="Número"
          error={errors.address?.number}
          defaultValue=""
          className="col-span-3 md:col-span-1"
        />

        <RhfTextField
          type="text"
          control={control}
          name="address.neighborhood"
          label="Bairro"
          error={errors.address?.neighborhood}
          className="col-span-3 md:col-span-1"
          defaultValue=""
        />

        <RhfTextField
          type="text"
          control={control}
          name="address.state"
          label="Estado"
          error={errors.address?.state}
          defaultValue=""
          className="col-span-3 md:col-span-1"
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
  );
};
