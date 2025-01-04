import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AccountReceivable, PayReceivable } from '@/types/account-receivable';
import { yupResolver } from '@hookform/resolvers/yup';
import { Banknote } from 'lucide-react';
import { useCallback, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import StepsContext from '../../providers/steps';
import { StepOne } from './components/step-one';
import { StepZero } from './components/step-zero';
import { payRecevableSchema } from './schema';

interface PayReceivableFormProps {
  receivableData: AccountReceivable;
  disabled?: boolean;
  onSubmit: (data: PayReceivable) => void;
  isLoading?: boolean;
}

export const PayReceivableForm = ({
  receivableData,
  disabled = false,
  onSubmit,
  isLoading = false,
}: PayReceivableFormProps) => {
  const { handleChangeStep, step } = useContext(StepsContext);
  const [open, setOpen] = useState<boolean>(false);
  const methods = useForm<PayReceivable>({
    resolver: yupResolver(payRecevableSchema),
  });

  const { handleSubmit, getValues } = methods;

  const handleBeforeSubmit = useCallback(() => {
    setOpen(false);
    handleChangeStep(0);
  }, [handleChangeStep]);

  const handleSubmitWithDuplicate = useCallback(() => {
    const values = getValues();
    onSubmit({
      ...values,
      id: receivableData.id,
      remaningAmount: receivableData.amount - values.amountReceived,
      generateDuplicate: true,
    });
    handleBeforeSubmit();
  }, [getValues, onSubmit, receivableData, handleBeforeSubmit]);

  const handleSubmitWithoutDuplicate = useCallback(() => {
    const values = getValues();
    onSubmit({
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
    onSubmit({
      ...data,
      id: receivableData.id,
      generateDuplicate: false,
      remaningAmount: 0,
    });
    handleBeforeSubmit();
  };

  const handleBackStep = () => handleChangeStep(0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-transparent"
          disabled={disabled}
        >
          <Banknote size={24} className="text-foreground" />
        </Button>
      </DialogTrigger>

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
              />
            )}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
