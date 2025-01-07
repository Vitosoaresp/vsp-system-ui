import { cn } from '@/lib/utils';
import { Meta } from '@/types/common';
import { ArrowUp } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export type Collumn = {
  label: string;
  value: string;
  disabledSort?: boolean;
};

interface DataTableProps {
  children: React.ReactNode;
  collumns: Collumn[];
  isLoading?: boolean;
  isEmpty?: boolean;
  handleChangeOrder: (orderBy: string) => void;
  meta?: Meta;
  handleChangePage: (page: number) => void;
  orderBy: string;
  sort: string;
}

export const DataTable = ({
  children,
  collumns,
  isLoading,
  isEmpty = false,
  handleChangeOrder,
  meta,
  handleChangePage,
  orderBy,
  sort,
}: DataTableProps) => {
  const currentPage = meta?.currentPage || 1;
  const total = meta?.total || 0;
  const disabledNextPage = currentPage >= Math.ceil(total / 20);
  const disabledPrevPage = currentPage <= 1;
  const handlePreviuosPage = () =>
    !disabledPrevPage && handleChangePage(currentPage - 1);
  const handleNextPage = () =>
    !disabledNextPage && handleChangePage(currentPage + 1);

  return (
    <>
      <div className="border rounded">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              {collumns.map(column => (
                <TableHead
                  className="text-foreground text-center group"
                  key={column.value}
                >
                  {column.disabledSort && (
                    <span className="ml-4">{column.label}</span>
                  )}
                  {!column.disabledSort && (
                    <span
                      className="text-foreground hover:no-underline px-0 inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                      onClick={() => handleChangeOrder(column.value)}
                    >
                      {column.label}
                      <ArrowUp
                        size={16}
                        className={cn(
                          'size-4 text-foreground transition-all group-hover:opacity-100',
                          orderBy !== column.value
                            ? 'opacity-0 flex-shrink-0'
                            : 'opacity-100',
                          sort === 'asc' ? 'rotate-0' : 'rotate-180',
                        )}
                      />
                    </span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading && isEmpty && (
              <TableRow className="">
                <TableCell
                  colSpan={collumns.length}
                  className="text-center text-foreground py-6 font-medium"
                >
                  Nenhum registro encontrado
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow className="">
                {Array.from({ length: collumns.length }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="bg-secondary w-full py-6" />
                  </TableCell>
                ))}
              </TableRow>
            )}
            {!isLoading && children}
          </TableBody>
        </Table>
      </div>

      <div className="pt-5">
        <Pagination className="text-foreground justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={disabledPrevPage}
                onClick={handlePreviuosPage}
              />
            </PaginationItem>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={handlePreviuosPage}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            {!disabledNextPage && (
              <PaginationItem>
                <PaginationLink onClick={handleNextPage}>
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage + 1 < total && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                disabled={disabledNextPage}
                onClick={handleNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
