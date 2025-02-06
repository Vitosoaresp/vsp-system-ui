import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
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
          <Typography variant="body1" color="secondary">
            {label}
          </Typography>
          {icon}
        </div>
        <Typography variant="h1">{formatCurrency(value ?? 0)}</Typography>
      </CardContent>
    </Card>
  );
};
