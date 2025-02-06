import { Navigation } from '@/components/navigation';
import { useGetPayableDashboardByMonthQuery } from '@/services/payable';
import { useGetReceivableDashboardByMonthQuery } from '@/services/receivable';
import {
  useGetSaleDashboardByMonthQuery,
  useGetSaleDashboardQuery,
} from '@/services/sale';
import { BadgeDollarSign, Coins, HandCoins } from 'lucide-react';
import { CardSummary } from './components/card-summary';
import { YearSalesDashboard } from './components/year-sales-dashboard';

export default function DashboardPage() {
  const { data: yearSalesReport, isLoading: isLoadingSaleDashboard } =
    useGetSaleDashboardQuery();
  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long' });
  const { data: saleReport, isLoading: isLoadingSaleReport } =
    useGetSaleDashboardByMonthQuery(currentMonth);
  const { data: receivableReport, isLoading: isLoadingReceivableReport } =
    useGetReceivableDashboardByMonthQuery(currentMonth);
  const { data: payableReport, isLoading: isLoadingPayableReport } =
    useGetPayableDashboardByMonthQuery(currentMonth);

  return (
    <div className="space-y-10">
      <Navigation />

      <div className="grid grid-cols-1 gap-6">
        <div className="grid lg:grid-cols-3 grid-rows-1 gap-6">
          <CardSummary
            label="Vendas no mês"
            value={saleReport?.value}
            icon={<BadgeDollarSign className="size-5" />}
            loading={isLoadingSaleReport}
          />
          <CardSummary
            label="Contas recebidas"
            value={receivableReport?.value}
            icon={<HandCoins className="size-5" />}
            loading={isLoadingReceivableReport}
          />
          <CardSummary
            label="Contas pagas"
            value={payableReport?.value}
            icon={<Coins className="size-5" />}
            loading={isLoadingPayableReport}
          />
        </div>
        <YearSalesDashboard
          data={yearSalesReport ?? []}
          loading={isLoadingSaleDashboard}
        />
      </div>
    </div>
  );
}
