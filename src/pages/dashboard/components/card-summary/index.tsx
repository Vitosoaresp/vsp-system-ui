import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils';

interface CardSummaryProps {
  label: string;
  value?: number;
  loading?: boolean;
  icon: React.ReactNode;
}

export const CardSummary = ({ label, value, icon, loading }: CardSummaryProps) => {
  if (loading) {
    return <Skeleton className="rounded-xl min-h-[122px]" />;
  }

  return (
    <Card>
      <CardContent className="flex flex-col pt-6 gap-3">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">{label}</p>
          {icon}
        </div>
        <CardTitle className="text-3xl">{formatCurrency(value ?? 0)}</CardTitle>
      </CardContent>
    </Card>
  );
};
