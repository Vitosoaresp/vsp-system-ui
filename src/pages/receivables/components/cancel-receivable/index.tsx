import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CancelReceivableProps {
  id: string;
  handleCancel: (id: string) => void;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const CancelReceivable = ({
  id,
  handleCancel,
  onOpenChange,
  open,
}: CancelReceivableProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Button type="button" variant="outline">
              Não
            </Button>
          </DialogClose>
          <Button type="button" variant="default" onClick={() => handleCancel(id)}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
