import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Sale } from '@/types/sale';
import { formatCurrency, getCustomerName } from '@/utils';
import { formatDate } from '@/utils/format-date';
import { formatInvoiceId } from '@/utils/format-invoice-id';
import { ShoppingBag } from 'lucide-react';

export const ShowDetails = ({ sale }: { sale: Sale }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-transparent">
          <ShoppingBag size={24} className="text-foreground" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background border-muted max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">Detalhes da venda</DialogTitle>
        </DialogHeader>
        <div className="py-3 grid grid-cols-2 gap-y-3">
          <div>
            <p className="font-medium">Data da venda</p>
            <p>{formatDate(sale.saleDate)}</p>
          </div>
          <div>
            <p className="font-medium">Total</p>
            <p>{formatCurrency(sale.total)}</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <p>{sale.status}</p>
          </div>
          <div>
            <p className="font-medium">Cliente</p>
            <p>{getCustomerName(sale.customer)}</p>
          </div>
          <div>
            <p className="font-medium">Vendedor</p>
            <p>{sale.user.name}</p>
          </div>
          <div>
            <p className="font-medium">Criado em</p>
            <p>{formatDate(sale.createdAt)}</p>
          </div>
        </div>
        <div>
          <p className="font-medium mb-1">Faturas</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parcela</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Pago em</TableHead>
                <TableHead>Valor pago</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sale.AccountReceivable.map(receivable => (
                <TableRow key={receivable.id} className="h-14">
                  <TableCell>{formatInvoiceId(receivable.saleId)}</TableCell>
                  <TableCell>{formatCurrency(receivable.amount)}</TableCell>
                  <TableCell>{formatDate(receivable.duoDate, 'L')}</TableCell>
                  <TableCell>
                    {receivable.paidAt ? formatDate(receivable.paidAt, 'L') : '-'}
                  </TableCell>
                  <TableCell>
                    {receivable.amountReceived
                      ? formatCurrency(receivable.amountReceived)
                      : '-'}
                  </TableCell>
                  <TableCell>{receivable.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <p className="font-medium mb-1">Produtos</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sale.SaleItem.map(item => (
                <TableRow key={item.id} className="h-14">
                  <TableCell>{item.product?.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>
                    {formatCurrency(item.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-background">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
