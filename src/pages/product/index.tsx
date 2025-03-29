import { Navigation } from '@/components/navigation';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from '@/services/product';
import { Product } from '@/types/product';
import { Package } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ProductForm } from './components';
import { ProductSkeleton } from './components/product-form/skeleton';

export const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const [create, { isLoading: isCreating }] = useCreateProductMutation();
  const [update, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { data: product, isLoading } = useGetProductQuery(id, {
    skip: !id,
  });

  const handleSubmit = async (data: Product) => {
    try {
      const method = id ? update : create;
      await method(data);
      toast.success(`Produto ${id ? 'atualizado' : 'criado'} com sucesso`);
      navigate('/produtos');
    } catch (error) {
      toast.error(`Error ao ${id ? 'atualizar' : 'criar'} o produto`);
    }
  };

  const isSubmiting = isCreating || isUpdating;

  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="flex gap-2 items-center">
            <Link to="/produtos">
              <Package className="size-4" />
              <span>Produtos</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="flex gap-2 items-center">
            <Link to={`/produto/${id ?? ''}`}>
              <span>Produto</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <div>
        {isLoading && <ProductSkeleton />}
        {!isLoading && (
          <ProductForm
            onSubmit={handleSubmit}
            isLoading={isSubmiting}
            initialValues={product}
          />
        )}
      </div>
    </div>
  );
};
