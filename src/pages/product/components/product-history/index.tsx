import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductHistory as ProductHistoryProp } from '@/types/product';
import { formatCurrency } from '@/utils';
import { ProductAction } from '@/utils/enum';
import { formatDate } from '@/utils/format-date';
import { getProductHistoryActionLabel } from '@/utils/helpers';

interface ProductHistoryProps {
  data?: ProductHistoryProp[];
}

export const ProductHistory = ({ data }: ProductHistoryProps) => {
  return (
    <div className="p-3 bg-muted rounded border border-border mt-4 dark:bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Ação</TableHead>
            <TableHead className="text-center">Preço de custo</TableHead>
            <TableHead className="text-center">Quantidade</TableHead>
            <TableHead className="text-center">Preço de venda</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[550px] overflow-scroll">
          {data?.map(history => (
            <TableRow key={history.id}>
              <TableCell>{formatDate(history.createdAt)}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getProductHistoryActionLabel(history.action)}
                </Badge>
              </TableCell>
              <TableCell>
                {history.action === ProductAction.SELL
                  ? formatCurrency(history.grossPrice)
                  : '-'}
              </TableCell>
              <TableCell>{history.quantity}</TableCell>
              <TableCell>
                {history.action === ProductAction.SELL
                  ? formatCurrency(history.salesPrice)
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
