import { Collumn, DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import { listCustomersFn } from '@/service/customer';
import { formatDate } from '@/utils/format-date';
import { useQuery } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const collumns: Collumn[] = [
  { label: 'Nome', value: 'firstName' },
  { label: 'Sobrenome', value: 'lastName' },
  { label: 'Email', value: 'email' },
  { label: 'Telefone', value: 'phone' },
  { label: 'CNPJ', value: 'cnpj' },
  { label: 'CPF', value: 'cpf' },
  { label: 'Atualizado em', value: 'updatedAt' },
  { label: 'Status', value: 'active' },
  { label: 'Editar', value: '', disabledSort: true },
];

export const ListCustomers = () => {
  const [search, setSearch] = useState('');
  const { params, handleSetParams } = useSearchParams({
    sort: 'desc',
    orderBy: 'updatedAt',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['customers', params],
    queryFn: () => listCustomersFn(params),
  });

  const handleChangeOrder = (column: string) => {
    handleSetParams({
      orderBy: column,
      sort: params.orderBy === column && params.sort === 'asc' ? 'desc' : 'asc',
    });
  };

  const handleChangeSearch = () => {
    handleSetParams({ search });
  };

  return (
    <div>
      <div className="mb-5 flex md:justify-between md:flex-row flex-col gap-4">
        <div className="max-w-lg flex gap-4 md:flex-row flex-col w-full items-center">
          <Input
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Perquisar por nome, email, telefone, cpf ou cnpj"
          />
          <Button
            type="button"
            variant="outline"
            className="uppercase"
            onClick={handleChangeSearch}
          >
            Pesquisar
          </Button>
        </div>

        <Button variant="outline" className="uppercase">
          <Link to="/cliente/">Criar novo Cliente</Link>
        </Button>
      </div>

      <DataTable
        collumns={collumns}
        isEmpty={data?.meta.total === 0}
        isLoading={isLoading}
        handleChangeOrder={handleChangeOrder}
        meta={data?.meta}
        handleChangePage={page => handleSetParams({ page })}
        orderBy={params.orderBy}
        sort={params.sort}
      >
        {data?.data.map(customer => (
          <TableRow key={customer.id} className="font-medium">
            <TableCell>{customer.firstName}</TableCell>
            <TableCell>{customer.lastName}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.cnpj || '-'}</TableCell>
            <TableCell>{customer.cpf || '-'}</TableCell>
            <TableCell>{formatDate(customer.updatedAt)}</TableCell>
            <TableCell>{customer.active ? 'Ativo' : 'Desativado'}</TableCell>
            <TableCell>
              <Link
                to={`/cliente/${customer.id}`}
                className="flex items-center justify-center"
              >
                <Pencil size={24} className="text-foreground" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </div>
  );
};
