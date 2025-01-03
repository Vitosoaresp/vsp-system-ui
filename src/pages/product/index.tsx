import { Header } from '@/components/header';
import { createProductFn, getProductFn, updateProductFn } from '@/service/product';
import { Product } from '@/types/product';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Package } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ProductForm } from './components';
import { ProductSkeleton } from './components/product-form/skeleton';

export const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { mutateAsync: create, isPending: isCreating } = useMutation({
    mutationFn: createProductFn,
  });
  const { mutateAsync: update, isPending: isUpdating } = useMutation({
    mutationFn: updateProductFn,
  });

  const { data: product, isLoading } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProductFn(params.id),
    enabled: !!params.id,
    retry: 1,
  });

  const handleSubmit = async (data: Product) => {
    try {
      const method = params.id ? update : create;
      await method(data);
      toast.success(`Produto ${params.id ? 'atualizado' : 'criado'} com sucesso`);
      navigate('/produtos');
    } catch (error) {
      toast.error(`Error ao ${params.id ? 'atualizar' : 'criar'} o produto`);
    }
  };

  const isSubmiting = isCreating || isUpdating;

  return (
    <div className="flex flex-col w-full">
      <Header
        title={params.id ? 'Editar Produto' : 'Novo Produto'}
        Icon={Package}
      />

      <div className="container py-10">
        {isLoading && <ProductSkeleton />}
        {!isLoading && (
          <ProductForm
            onSubmit={handleSubmit}
            isLoading={isSubmiting}
            initialValues={params.id ? product : undefined}
          />
        )}
      </div>
    </div>
  );
};
