import { Grid } from '@/components/grid';
import { RhfCurrencyField } from '@/components/rhf/currency-field';
import { RhfDatePicker } from '@/components/rhf/date-picker';
import { RhfSelect } from '@/components/rhf/select';
import { useListSuppliersQuery } from '@/services/supplier';
import { AccountPayable } from '@/types/account-payable';
import { FinancialStatus } from '@/types/common';
import { receivableStatusOptions } from '@/utils/enum-options';
import { useForm } from 'react-hook-form';

interface CreatePayableFormProps {
  onSubmit: (data: AccountPayable) => void;
}

export const CreatePayableForm = ({ onSubmit }: CreatePayableFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AccountPayable>({
    defaultValues: {
      status: FinancialStatus.PENDING,
      amountPaid: 0,
      isDuplicated: false,
      tagId: 'c3a9ad02-a1a8-4eff-8485-acfcb093ecef',
    },
  });

  const { data: suppliers } = useListSuppliersQuery({ perPage: 9999 });

  return (
    <form
      className="w-full"
      id="create-payable-form"
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();

        handleSubmit(onSubmit)();
      }}
    >
      <Grid className="grid-cols-1">
        <RhfSelect
          options={receivableStatusOptions}
          control={control}
          name="status"
          defaultValue={FinancialStatus.PENDING}
          label="Status"
          disabled
        />

        <RhfSelect
          label="Fornecedor"
          control={control}
          name="supplierId"
          defaultValue=""
          options={
            suppliers?.data.map(supplier => ({
              value: supplier.id,
              label: supplier.name,
            })) ?? []
          }
          error={errors.supplierId}
        />

        <RhfCurrencyField
          control={control}
          name="amount"
          label="Valor"
          defaultValue={0}
          error={errors.amount}
        />

        <RhfDatePicker
          label="Vencimento"
          name="dueDate"
          control={control}
          defaultValue=""
          error={errors.dueDate}
        />
      </Grid>
    </form>
  );
};
