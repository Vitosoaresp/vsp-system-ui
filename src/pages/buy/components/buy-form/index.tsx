import { Grid } from '@/components/grid';
import { RhfCombobox } from '@/components/rhf/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useListSuppliersQuery } from '@/services/supplier';
import { Buy } from '@/types/account-payable';
import { format } from 'date-fns';
import { FormProvider, useForm } from 'react-hook-form';

export const BuyForm = () => {
  const methods = useForm<Buy>();

  const {
    control,
    formState: { errors },
  } = methods;

  const { data: suppliers, isLoading } = useListSuppliersQuery({ perPage: 99999 });

  const suppliersOptions =
    suppliers?.data.map(supplier => ({
      label: supplier.name,
      value: String(supplier.id),
      cnpj: supplier.cnpj,
      address: supplier.address,
    })) ?? [];

  // const { data: productsOptions, isLoading: isLoadingProducts } = useQuery({
  // 	queryFn: () => getProducts({ perPage: 99999 }),
  // 	queryKey: ['products'],
  // 	select: data =>
  // 		data.data?.map(product => ({
  // 			label: product.name,
  // 			value: product.id,
  // 		})) ?? [],
  // });

  const selectedSupplier = suppliersOptions?.find(
    supplier => supplier.value === methods.watch('supplierId'),
  );

  return (
    <FormProvider {...methods}>
      <div className="container pt-8 pb-4">
        <form>
          <Grid>
            <h2 className="text-2xl font-bold text-zinc-200 mb-5">Dados da NF</h2>
          </Grid>

          <Grid>
            <RhfCombobox
              control={control}
              name="supplierId"
              options={suppliersOptions ?? []}
              label="Fornecedor"
              error={errors.supplierId}
              loading={isLoading}
              defaultValue=""
            />

            <div className="flex flex-col">
              <Label className="text-zinc-100 mb-1" htmlFor="cnpj">
                Data da NF
              </Label>
              <Input disabled value={format(new Date(), 'dd/MM/yyyy')} />
            </div>
          </Grid>

          <Grid>
            <div className="flex flex-col">
              <Label className="text-zinc-100 mb-1" htmlFor="cnpj">
                CNPJ
              </Label>
              <Input disabled name="cnpj" value={selectedSupplier?.cnpj} />
            </div>
          </Grid>
        </form>
      </div>
    </FormProvider>
  );
};
