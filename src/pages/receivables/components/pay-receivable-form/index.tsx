import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AccountReceivable, PayReceivable } from '@/types/account-receivable';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import StepsContext from '../../providers/steps';
import { StepOne } from './components/step-one';
import { StepZero } from './components/step-zero';
import { payRecevableSchema } from './schema';

interface PayReceivableFormProps {
  receivableData: AccountReceivable;
  onSubmit: (data: PayReceivable) => Promise<void>;
  isLoading?: boolean;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const PayReceivableForm = ({
  receivableData,
  onSubmit,
  isLoading = false,
  onOpenChange,
  open,
}: PayReceivableFormProps) => {
  const { handleChangeStep, step } = useContext(StepsContext);
  const methods = useForm<PayReceivable>({
    resolver: yupResolver(payRecevableSchema),
  });

  const { handleSubmit, getValues } = methods;

  const handleBeforeSubmit = useCallback(() => {
    onOpenChange(false);
    handleChangeStep(0);
  }, [handleChangeStep]);

  const handleSubmitWithDuplicate = useCallback(async () => {
    const values = getValues();
    await onSubmit({
      ...values,
      id: receivableData.id,
      remaningAmount: receivableData.amount - values.amountReceived,
      generateDuplicate: true,
    });
    handleBeforeSubmit();
  }, [getValues, onSubmit, receivableData, handleBeforeSubmit]);

  const handleSubmitWithoutDuplicate = useCallback(async () => {
    const values = getValues();
    await onSubmit({
      ...values,
      id: receivableData.id,
      remaningAmount: 0,
      generateDuplicate: false,
    });
    handleBeforeSubmit();
  }, [getValues, onSubmit, receivableData, handleBeforeSubmit]);

  const handlePayReceivable = async (data: PayReceivable) => {
    const difference = receivableData.amount - data.amountReceived;
    if (difference > 0) {
      return handleChangeStep(1);
    }
    await onSubmit({
      ...data,
      id: receivableData.id,
      generateDuplicate: false,
      remaningAmount: 0,
    });
    handleBeforeSubmit();
  };

  const handleBackStep = () => handleChangeStep(0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-muted max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-foreground">Confirmar Pagamento</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handlePayReceivable)}>
            {step === 0 && <StepZero isLoading={isLoading} />}
            {step === 1 && (
              <StepOne
                handleBackStep={handleBackStep}
                handleSubmitWithDuplicate={handleSubmitWithDuplicate}
                handleSubmitWithoutDuplicate={handleSubmitWithoutDuplicate}
                isLoading={isLoading}
              />
            )}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
