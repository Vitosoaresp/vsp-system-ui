import { Navigation } from '@/components/navigation';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  useCreateCustomerMutation,
  useGetCustomerQuery,
  useUpdateCustomerMutation,
} from '@/services/customer';
import { Customer } from '@/types/customer';
import { Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { CustomerForm } from './components';
import { CustomerSkeleton } from './components/customer-form/skeleton';

export const CustomerPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [create, { isLoading: isCreating }] = useCreateCustomerMutation();
  const [update, { isLoading: isUpdating }] = useUpdateCustomerMutation();

  const { data: customer, isLoading } = useGetCustomerQuery(params.id!);

  const handleSubmit = async (data: Customer) => {
    try {
      const method = params.id ? update : create;
      await method({ ...data, id: params.id! });
      toast.success(`Cliente ${params.id ? 'atualizado' : 'criado'} com sucesso`);
      navigate('/clientes');
    } catch (error) {
      toast.error(`Error ao ${params.id ? 'atualizar' : 'criar'} o cliente`);
    }
  };

  const isSubmiting = isCreating || isUpdating;

  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clientes" className="flex gap-2 items-center">
            <Users className="size-4" />
            <span>Clientes</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/cliente/${params.id ?? ''}`}
            className="flex gap-2 items-center"
          >
            <span>Cliente</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <div className="border border-border rounded py-5 px-4 bg-card">
        {isLoading && <CustomerSkeleton />}
        {!isLoading && (
          <CustomerForm
            onSubmit={handleSubmit}
            isLoading={isSubmiting}
            initialValues={params.id ? customer : undefined}
          />
        )}
      </div>
    </div>
  );
};
