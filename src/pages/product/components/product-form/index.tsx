import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, ProductGeneralData, ProductPrices } from '@/types/product';
import { emptyProduct } from '@/utils/helpers';
import { TabsContent } from '@radix-ui/react-tabs';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductHistory } from '../product-history';
import { GeneralDataForm } from './components/general-data-form';
import { PricesForm } from './components/prices-form';

interface ProductFormProps {
  onSubmit: (data: Product) => void;
  initialValues?: Product;
  isLoading?: boolean;
}

export const ProductForm = ({
  initialValues = emptyProduct,
  onSubmit,
  isLoading,
}: ProductFormProps) => {
  const [currentValues, setCurrentValues] =
    useState<Partial<Product>>(initialValues);
  const [tab, setTab] = useState<string>('geral-data');
  const navigate = useNavigate();
  const isNewProduct = useMemo(() => !initialValues?.id, [initialValues]);
  const handleBack = () => navigate('/produtos');

  const handleGeneralDataSubmit = (data: ProductGeneralData) => {
    if (isNewProduct) {
      setCurrentValues(prev => ({ ...prev, ...data }));
      return setTab('prices');
    }
    onSubmit({ ...initialValues, ...data });
  };

  const handleProductPricesSubmit = (data: ProductPrices) => {
    const payload = isNewProduct
      ? { ...currentValues, ...data }
      : { ...initialValues, ...data };
    onSubmit(payload as Product);
  };

  return (
    <div>
      <h4 className="text-foreground text-xl font-medium mb-4">
        {!isNewProduct ? 'Editar Produto' : 'Novo Produto'}
      </h4>

      <Tabs defaultValue="geral-data" value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start bg-transparent border-b border-b-muted rounded-none p-0 h-auto">
          <TabsTrigger
            className="data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] rounded-none hover:text-primary"
            value="geral-data"
          >
            Dados gerais
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] rounded-none hover:text-primary"
            value="prices"
            disabled={isNewProduct}
          >
            Preços
          </TabsTrigger>

          <TabsTrigger
            className="data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] rounded-none hover:text-primary"
            value="product-history"
            disabled={isNewProduct}
          >
            Historico do Produto
          </TabsTrigger>
        </TabsList>

        <TabsContent value="geral-data">
          <GeneralDataForm
            isLoading={isLoading}
            handleBack={handleBack}
            handleGeneralDataSubmit={handleGeneralDataSubmit}
            initialValues={initialValues}
          />
        </TabsContent>
        <TabsContent value="prices">
          <PricesForm
            isLoading={isLoading}
            handleBack={handleBack}
            handlePricesSubmit={handleProductPricesSubmit}
            initialValues={initialValues}
          />
        </TabsContent>
        <TabsContent value="product-history">
          <ProductHistory data={initialValues.histories} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
