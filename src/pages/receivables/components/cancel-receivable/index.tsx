import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Ban } from 'lucide-react';

interface CancelReceivableProps {
  id: string;
  handleCancel: (id: string) => void;
  disabled: boolean;
}

export const CancelReceivable = ({
  id,
  handleCancel,
  disabled,
}: CancelReceivableProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="hover:bg-transparent"
          disabled={disabled}
        >
          <Ban size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background max-w-sm">
        <DialogHeader>
          <DialogTitle>Cancelar conta a receber</DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-foreground font-medium">
            Deseja realmente cancelar esse recebimento?
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Não
            </Button>
          </DialogClose>
          <Button type="button" variant="ghost" onClick={() => handleCancel(id)}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
