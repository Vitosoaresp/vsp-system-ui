import { Navigation } from '@/components/navigation';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  useCreateSupplierMutation,
  useGetSupplierQuery,
  useUpdateSupplierMutation,
} from '@/services/supplier';
import { Supplier } from '@/types/supplier';
import { Factory } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { SupplierForm } from './components';
import { SupplierSkeleton } from './components/supplier-form/skeleton';

export const SupplierPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [createSupplier, { isLoading: isCreating }] = useCreateSupplierMutation();
  const [updateSupplier, { isLoading: isUpdating }] = useUpdateSupplierMutation();

  const { data: supplier, isLoading } = useGetSupplierQuery(params.id ?? '', {
    skip: !!params.id,
  });

  const handleSubmit = async (data: Omit<Supplier, 'id'>) => {
    try {
      const method = params.id ? createSupplier : updateSupplier;
      await method({ ...data, id: params.id! });
      toast.success(
        `Fornecedor ${params.id ? 'atualizado' : 'criado'} com sucesso`,
      );
      navigate('/fornecedores');
    } catch (error) {
      toast.error(`Error ao ${params.id ? 'atualizar' : 'criar'} o fornecedor`);
    }
  };

  const isSubmiting = isCreating || isUpdating;

  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink href="/fornecedores" className="flex gap-2 items-center">
            <Factory className="size-4" />
            <span>Fornecedores</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/fornecedor/${params.id ?? ''}`}
            className="flex gap-2 items-center"
          >
            <span>Fornecedor</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <div className="border border-border rounded py-5 px-4 bg-card">
        {isLoading && <SupplierSkeleton />}
        {!isLoading && (
          <SupplierForm
            onSubmit={handleSubmit}
            isLoading={isSubmiting}
            initialValues={params.id ? supplier : undefined}
          />
        )}
      </div>
    </div>
  );
};
