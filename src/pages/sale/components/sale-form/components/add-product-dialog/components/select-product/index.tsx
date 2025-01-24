import { Combobox } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useGetProductsQuery } from '@/services/product';
import { Product } from '@/types/product';

interface SelectProductProps {
  onSelectProduct: (product: Product | null) => void;
  product: Product | null;
  onConfirm: () => void;
}

export const SelectProduct = ({
  onSelectProduct,
  product,
  onConfirm,
}: SelectProductProps) => {
  const { data, isLoading } = useGetProductsQuery({ perPage: 99999 });

  const productsOptions =
    data?.data?.map(product => ({
      label: `${product.code} - ${product.name}`,
      value: String(product.id),
    })) ?? [];

  const handleChangeProduct = (id: string) => {
    const product = data?.data.find(product => product.id === id) ?? null;
    onSelectProduct(product);
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="w-full flex gap-4 flex-col">
        <Label>Selecione um produto</Label>
        <Combobox
          options={productsOptions}
          onChange={handleChangeProduct}
          loading={isLoading}
          value={product?.id}
          fullWidth
          emptyLabel="Selecione"
        />
      </div>
      <DialogFooter>
        <Button disabled={!product} onClick={onConfirm}>
          Avançar
        </Button>
      </DialogFooter>
    </div>
  );
};
