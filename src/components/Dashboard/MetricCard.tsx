
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  changeText?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  change,
  changeText,
  className,
}: MetricCardProps) {
  const isPositive = change && change > 0;

  return (
    <Card className={cn("shadow-md overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between bg-background pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground font-serif">{value}</div>
        {change !== undefined && (
          <div className="flex items-center space-x-1 mt-1">
            <span
              className={cn(
                "flex items-center text-xs",
                isPositive ? "text-emerald-600" : "text-red-600"
              )}
            >
              {isPositive ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              {Math.abs(change)}%
            </span>
            {changeText && (
              <span className="text-xs text-muted-foreground">
                {changeText}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
