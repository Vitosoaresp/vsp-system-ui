import { RhfCurrencyField } from '@/components/rhf/currency-field';
import { RhfTextField } from '@/components/rhf/text-field';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { SalePayload } from '@/types/sale';
import { formatCurrency } from '@/utils';
import { Package2, Trash, X } from 'lucide-react';
import { useCallback } from 'react';
import { FieldArrayWithId, useFormContext } from 'react-hook-form';

interface TableProductsProps {
  handleRemoveProduct: (index: number) => void;
  products: FieldArrayWithId<SalePayload, 'items', 'id'>[];
}

export const TableProducts = ({
  handleRemoveProduct,
  products,
}: TableProductsProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<SalePayload>();
  const watchedProducts = watch('items');

  const getProductTotal = useCallback(
    (index: number) => {
      const quantity = watchedProducts[index].quantity;
      const price = watchedProducts[index].price;
      return quantity * price;
    },
    [watchedProducts],
  );

  return (
    <>
      <h2 className="text-foreground text-xl font-medium flex items-center">
        <Package2 className="text-foreground mr-3" />
        Produtos
      </h2>

      <Table className="my-5">
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>
              <Trash className="text-foreground size-5" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!products.length && (
            <TableRow>
              <TableCell
                colSpan={6}
                className={cn(
                  'text-center text-xl font-medium py-4',
                  errors?.items ? 'text-destructive' : 'text-foreground',
                )}
              >
                Nenhum produto selecionado
              </TableCell>
            </TableRow>
          )}
          {products?.map((product, i) => (
            <TableRow key={product.id}>
              <TableCell>{product.code}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <RhfTextField
                  control={control}
                  name={`items.${i}.quantity` as const}
                  type="number"
                  label=""
                  error={errors?.items?.[i]?.quantity}
                />
              </TableCell>
              <TableCell>
                <RhfCurrencyField
                  control={control}
                  name={`items.${i}.price` as const}
                  label=""
                  error={errors?.items?.[i]?.price}
                />
              </TableCell>
              <TableCell>{formatCurrency(getProductTotal(i))}</TableCell>
              <TableCell>
                <Button
                  variant="link"
                  className="bg-transparent px-0"
                  onClick={() => handleRemoveProduct(i)}
                >
                  <X className="text-foreground/80" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
