import { Navigation } from '@/components/navigation';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCreateSaleMutation } from '@/services/sale';
import { SalePayload } from '@/types/sale';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SaleForm } from './components';

export const SalePage = () => {
  const navigate = useNavigate();

  const [create, { isLoading }] = useCreateSaleMutation();

  const handleSubmit = async (data: SalePayload) => {
    try {
      await create(data);
      toast.success('Venda criada com sucesso!');
      navigate('/vendas');
    } catch (error) {
      toast.error('Erro ao criar venda');
    }
  };

  return (
    <div className="flex flex-col w-full space-y-10">
      <Navigation>
        <BreadcrumbItem>
          <BreadcrumbLink href="/vendas" className="flex gap-2 items-center">
            <ShoppingCart className="size-4" />
            <span>Vendas</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/venda/" className="flex gap-2 items-center">
            <span>Nova venda</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Navigation>

      <div>
        <SaleForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};
