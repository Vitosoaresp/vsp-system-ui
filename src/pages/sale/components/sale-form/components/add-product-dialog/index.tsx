import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Product } from '@/types/product';
import { Items } from '@/types/sale';
import { useState } from 'react';
import { EditProduct } from './components/edit-product';
import { SelectProduct } from './components/select-product';

interface AddProductDialogProps {
  onSubmit: (data: Items) => void;
}

export const AddProductDialog = ({ onSubmit }: AddProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [step, setStep] = useState(0);

  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => (prev === 0 ? 0 : prev - 1));

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (open === false) {
      setStep(0);
      setCurrentProduct(null);
    }
  };

  const handleSubmit = (item: Items) => {
    onSubmit(item);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Produto</Button>
      </DialogTrigger>
      <DialogContent className="bg-background border-border">
        <DialogTitle className="text-foreground">Adicionar produto</DialogTitle>

        {step === 0 && (
          <SelectProduct
            onConfirm={handleNextStep}
            product={currentProduct}
            onSelectProduct={setCurrentProduct}
          />
        )}

        {step === 1 && currentProduct && (
          <EditProduct
            initialValue={currentProduct}
            onSubmit={handleSubmit}
            onBack={handlePrevStep}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
