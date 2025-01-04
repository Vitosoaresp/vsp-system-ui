import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
    <div className="flex flex-col w-full space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/produtos" className="flex gap-2 items-center">
              <Package className="size-4" />
              <span>Produtos</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/produto/${params.id ?? ''}`}
              className="flex gap-2 items-center"
            >
              <span>Produto</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="border border-border rounded py-5 px-4 bg-card">
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
