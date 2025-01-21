import { Collumn, DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import { listSuppliersFn } from '@/services/supplier';
import { formatDate } from '@/utils/format-date';
import { useQuery } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const tableColumns: Collumn[] = [
  { label: 'Nome', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Telefone', value: 'phone' },
  { label: 'CNPJ', value: 'cnpj' },
  { label: 'Atualizado em', value: 'updatedAt' },
  { label: 'Status', value: 'active' },
  { label: 'Editar', value: '', disabledSort: true },
];

export const ListSuppliers = () => {
  const [search, setSearch] = useState('');
  const { params, handleSetParams } = useSearchParams({
    sort: 'desc',
    orderBy: 'updatedAt',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['suppliers', params],
    queryFn: () => listSuppliersFn(params),
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
        <div className="max-w-lg flex gap-4 md:flex-row flex-col w-full items-center  ">
          <Input
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Perquisar por nome, email, telefone ou cnpj"
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
          <Link to="/fornecedor/">Criar novo Fornecedor</Link>
        </Button>
      </div>

      <DataTable
        collumns={tableColumns}
        orderBy={params.orderBy}
        sort={params.sort}
        isEmpty={data?.meta.total === 0}
        isLoading={isLoading}
        handleChangeOrder={handleChangeOrder}
        meta={data?.meta}
        handleChangePage={page => handleSetParams({ page })}
      >
        {data?.data.map(supplier => (
          <TableRow key={supplier.id} className="font-medium">
            <TableCell className="py-4">{supplier.name}</TableCell>
            <TableCell>{supplier.email}</TableCell>
            <TableCell>{supplier.phone}</TableCell>
            <TableCell>{supplier.cnpj ?? '-'}</TableCell>
            <TableCell>{formatDate(supplier.updatedAt)}</TableCell>
            <TableCell>{supplier.active ? 'Ativo' : 'Desativado'}</TableCell>
            <TableCell>
              <Link
                to={`/fornecedor/${supplier.id}`}
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
