import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface StepOneProps {
	handleBackStep: () => void;
	handleSubmitWithoutDuplicate: () => void;
	handleSubmitWithDuplicate: () => void;
}

export const StepOne = ({
	handleBackStep,
	handleSubmitWithDuplicate,
	handleSubmitWithoutDuplicate,
}: StepOneProps) => {
	return (
		<div>
			<p className="text-zinc-200 font-medium">
				O valor pago é menor que o valor da conta a receber. Deseja gerar uma
				duplicata?
			</p>

			<DialogFooter className="mt-5">
				<Button type="button" onClick={handleBackStep}>
					Voltar
				</Button>
				<Button type="button" onClick={handleSubmitWithoutDuplicate}>
					Não
				</Button>
				<Button type="button" onClick={handleSubmitWithDuplicate}>
					Sim
				</Button>
			</DialogFooter>
		</div>
	);
};
