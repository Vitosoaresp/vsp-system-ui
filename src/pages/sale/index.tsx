import { Header } from '@/components/header';
import { createSaleFn } from '@/service/sale';
import { SalePayload } from '@/types/sale';
import { useMutation } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SaleForm } from './components';

export const SalePage = () => {
  const navigate = useNavigate();

  const { mutateAsync: create, isPending: isLoading } = useMutation({
    mutationFn: createSaleFn,
  });

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
    <div className="flex flex-col w-full">
      <Header title="Criar venda" Icon={ShoppingCart} />

      <div className="py-10 container">
        {!isLoading && <SaleForm onSubmit={handleSubmit} isLoading={isLoading} />}
      </div>
    </div>
  );
};
