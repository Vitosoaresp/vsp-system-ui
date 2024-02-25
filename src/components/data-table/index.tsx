import { Meta } from '@/types/common';
import { ArrowDownUp } from 'lucide-react';
import { Button } from '../ui/button';
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
}

export const DataTable = ({
	children,
	collumns,
	isLoading,
	isEmpty = false,
	handleChangeOrder,
	meta,
	handleChangePage,
}: DataTableProps) => {
	const currentPage = meta?.currentPage || 1;
	const total = meta?.total || 0;
	const disabledNextPage = currentPage >= Math.ceil(total / 20);
	const disabledPrevPage = currentPage <= 1;
	const handlePreviuosPage = () =>
		!disabledPrevPage && handleChangePage(currentPage - 1);
	const handleNextPage = () =>
		!disabledNextPage && handleChangePage(currentPage + 1);
	const showNextPage = currentPage < total;

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className='hover:bg-zinc-800'>
						{collumns.map((column) => (
							<TableHead className='text-zinc-50' key={column.value}>
								{column.disabledSort && column.label}
								{!column.disabledSort && (
									<Button
										variant='link'
										className='text-zinc-50 hover:no-underline px-0'
										onClick={() => handleChangeOrder(column.value)}
									>
										{column.label}
										<ArrowDownUp size={16} className='text-zinc-200 ml-1' />
									</Button>
								)}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{!isLoading && isEmpty && (
						<TableRow className='hover:bg-black'>
							<TableCell
								colSpan={collumns.length}
								className='text-center text-zinc-50 text-lg py-6 font-medium'
							>
								Nenhum registro encontrado
							</TableCell>
						</TableRow>
					)}
					{isLoading && (
						<TableRow className='hover:bg-black'>
							{Array.from({ length: collumns.length }).map((_, index) => (
								<TableCell key={index}>
									<Skeleton className=' bg-zinc-800 w-full py-6' />
								</TableCell>
							))}
						</TableRow>
					)}
					{!isLoading && children}
				</TableBody>
			</Table>
			<div className='border-t border-zinc-100 pt-5'>
				<Pagination className='bg-black text-zinc-50 justify-end'>
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
						{showNextPage && (
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
