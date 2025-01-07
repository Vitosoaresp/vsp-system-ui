import { Collumn, DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSearchParams } from '@/hooks';
import { getProducts } from '@/service/product';
import { formatCurrency } from '@/utils';
import { formatDate } from '@/utils/format-date';
import { useQuery } from '@tanstack/react-query';
import { Check, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const tableColumns: Collumn[] = [
  { label: 'Código', value: 'code' },
  { label: 'Nome', value: 'name' },
  { label: 'Preço de compra', value: 'grossPrice' },
  { label: 'Preço de venda', value: 'salesPrice' },
  { label: 'Quantidade', value: 'quantity' },
  { label: 'Atualizado em', value: 'updatedAt' },
  { label: 'Status', value: 'active' },
  { label: 'Editar', value: '', disabledSort: true },
];

export const ListProducts = () => {
  const [search, setSearch] = useState('');
  const { params, handleSetParams } = useSearchParams({
    sort: 'desc',
    orderBy: 'updatedAt',
  });
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(params),
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

  const handleAddNewProduct = () => navigate('/produto');

  return (
    <div>
      <div className="mb-5 flex md:justify-between md:flex-row flex-col gap-4">
        <div className="max-w-lg flex gap-4 md:flex-row flex-col w-full items-center">
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
        <Button onClick={handleAddNewProduct} variant="outline">
          Criar novo produto
        </Button>
      </div>
      <DataTable
        collumns={tableColumns}
        isEmpty={data?.meta.total === 0}
        isLoading={isLoading}
        handleChangeOrder={handleChangeOrder}
        meta={data?.meta}
        handleChangePage={page => handleSetParams({ page })}
        orderBy={params.orderBy}
        sort={params.sort}
      >
        {data?.data.map(product => (
          <TableRow key={product.id} className="font-medium">
            <TableCell>{product.code}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.grossPrice)}</TableCell>
            <TableCell>{formatCurrency(product.salesPrice)}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{formatDate(product.updatedAt)}</TableCell>
            <TableCell>
              <Badge className="items-center justify-center gap-1">
                {product.active ? (
                  <>
                    <Check className="text-green-500 size-4" />
                    <span className="font-medium">Ativo</span>
                  </>
                ) : (
                  <>
                    <X className="text-destructive size-4" />
                    <span className="font-medium">Inativo</span>
                  </>
                )}
              </Badge>
            </TableCell>
            <TableCell>
              <Link
                to={`/produto/${product.id}`}
                className="p-2 flex items-center justify-center"
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
