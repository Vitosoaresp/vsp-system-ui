import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface StepOneProps {
  handleBackStep: () => void;
  handleSubmitWithoutDuplicate: () => void;
  handleSubmitWithDuplicate: () => void;
  isLoading?: boolean;
}

export const StepOne = ({
  handleBackStep,
  handleSubmitWithDuplicate,
  handleSubmitWithoutDuplicate,
  isLoading = false,
}: StepOneProps) => {
  return (
    <div>
      <p className="text-zinc-200 font-medium">
        O valor informado é menor que o valor total. Deseja gerar um novo
        recebimento com o valor restante ?
      </p>

      <DialogFooter className="mt-5">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={handleBackStep}
        >
          Voltar
        </Button>
        <Button
          type="button"
          loading={isLoading}
          variant="destructive"
          onClick={handleSubmitWithoutDuplicate}
        >
          Não
        </Button>
        <Button
          type="button"
          loading={isLoading}
          onClick={handleSubmitWithDuplicate}
        >
          Sim
        </Button>
      </DialogFooter>
    </div>
  );
};
