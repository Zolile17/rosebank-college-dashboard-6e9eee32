import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { format } from "date-fns";

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
  className?: string;
}

export function RevenueChart({ data, className }: RevenueChartProps) {
  const formatter = (value: number) => `R${value.toLocaleString()}`;

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card text-card-foreground p-3 shadow rounded border border-border">
          <p className="text-sm font-medium">{format(new Date(label), 'MMM d, yyyy')}</p>
          <p className="text-sm font-medium text-lv-gold">
            {formatter(payload[0].value as number)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2DED5" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(tick) => format(new Date(tick), 'MMM d')}
                stroke="#7C7166"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={formatter}
                width={60}
                stroke="#7C7166"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#B99F65" 
                fill="url(#colorGradient)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B99F65" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#B99F65" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
