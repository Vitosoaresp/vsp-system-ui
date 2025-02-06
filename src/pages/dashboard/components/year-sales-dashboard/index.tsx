import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { SaleDashboard } from '@/types/sale';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

interface YearSalesDashboardProps {
  loading: boolean;
  data: SaleDashboard[];
}

export const YearSalesDashboard = ({ loading, data }: YearSalesDashboardProps) => {
  const chartConfig = {
    total: {
      label: 'Total',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas no ano</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-[500px] w-full rounded-lg" />}
        {!loading && (
          <ChartContainer className="h-[500px] w-full" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="total"
                type="natural"
                fill="var(--color-total)"
                fillOpacity={0.4}
                stroke="var(--color-total)"
                animateNewValues
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
