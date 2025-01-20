import { Grid } from '@/components/grid';
import { RhfCurrencyField } from '@/components/rhf/currency-field';
import { RhfDatePicker } from '@/components/rhf/date-picker';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { PayReceivable } from '@/types/account-receivable';
import { useFormContext } from 'react-hook-form';

export const StepZero = ({ isLoading }: { isLoading: boolean }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<PayReceivable>();

  return (
    <>
      <Grid className="grid-cols-1 gap-3">
        <RhfCurrencyField
          control={control}
          name="amountReceived"
          label="Valor"
          defaultValue={0}
          error={errors.amountReceived}
        />

        <RhfDatePicker
          control={control}
          name="paidAt"
          label="Data de pagamento"
          defaultValue={new Date().toISOString()}
          error={errors.paidAt}
        />
      </Grid>
      <DialogFooter className="mt-5">
        <DialogClose asChild>
          <Button type="button" loading={isLoading}>
            Fechar
          </Button>
        </DialogClose>
        <Button variant="outline" type="submit" loading={isLoading}>
          Confirmar
        </Button>
      </DialogFooter>
    </>
  );
};
