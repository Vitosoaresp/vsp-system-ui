import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getProducts } from '@/services/product';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { PackageCheck } from 'lucide-react';

interface SelectProductsProps {
  handleToggleProduct: (product: Product) => void;
  selectedProducts: Product[];
  handleAppendProducts: () => void;
}

export const SelectProducts = ({
  selectedProducts,
  handleToggleProduct,
  handleAppendProducts,
}: SelectProductsProps) => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    select: data => data.data,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Produto</Button>
      </DialogTrigger>
      <DialogContent className="bg-background border-border">
        <DialogTitle className="text-foreground">Selecione um Produto</DialogTitle>

        <div className="mt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>
                  <PackageCheck className="text-foreground" />
                </TableCell>
                <TableCell className="text-lg font-medium">Código</TableCell>
                <TableCell className="text-lg font-medium">Nome</TableCell>
                <TableCell className="text-lg font-medium">Preço</TableCell>
                <TableCell className="text-lg font-medium">Quant.</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map(product => (
                <TableRow key={product.id} className="h-14">
                  <TableCell>
                    <Checkbox
                      onCheckedChange={() => handleToggleProduct(product)}
                      checked={selectedProducts.some(p => p.id === product.id)}
                      className="h-4"
                    />
                  </TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{formatCurrency(product.salesPrice)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button onClick={handleAppendProducts}>Selecionar</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
