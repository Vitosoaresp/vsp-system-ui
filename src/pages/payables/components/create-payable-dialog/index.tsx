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
import { useCreatePayableMutation } from '@/services/payable';
import { AccountPayable } from '@/types/account-payable';
import { useState } from 'react';
import { toast } from 'sonner';
import { CreatePayableForm } from './components/create-payable-form';

export const CreatePayableDialog = () => {
  const [create, { isLoading: isCreating }] = useCreatePayableMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = async (data: AccountPayable) => {
    try {
      await create(data).unwrap();
      toast.info('Conta adicionada com sucesso!');
      setIsOpen(false);
    } catch {
      toast.error('Ocorreu um erro ao criar nova conta.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar nova conta</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova conta</DialogTitle>
        </DialogHeader>

        <div className="w-full">
          <CreatePayableForm onSubmit={handleCreate} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isCreating}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="default"
            type="submit"
            form="create-payable-form"
            loading={isCreating}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
