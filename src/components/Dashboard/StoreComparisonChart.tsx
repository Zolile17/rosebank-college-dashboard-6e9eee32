
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface StoreData {
  name: string;
  johannesburg: number;
  capeTown: number;
}

interface StoreComparisonChartProps {
  data: StoreData[];
  className?: string;
}

type TimeRange = 'daily' | 'weekly' | 'monthly';

export function StoreComparisonChart({ data, className }: StoreComparisonChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');

  return (
    <Card className={cn("shadow-md overflow-hidden", className)}>
      <CardHeader className="bg-background pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-lv-brown">
            Store Performance
          </CardTitle>
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            <Button 
              variant={timeRange === 'daily' ? 'default' : 'ghost'} 
              size="sm" 
              className={cn(
                "h-8 text-xs",
                timeRange === 'daily' ? 'bg-lv-gold text-white hover:bg-lv-gold/90' : 'text-muted-foreground'
              )}
              onClick={() => setTimeRange('daily')}
            >
              Daily
            </Button>
            <Button 
              variant={timeRange === 'weekly' ? 'default' : 'ghost'} 
              size="sm" 
              className={cn(
                "h-8 text-xs",
                timeRange === 'weekly' ? 'bg-lv-gold text-white hover:bg-lv-gold/90' : 'text-muted-foreground'
              )}
              onClick={() => setTimeRange('weekly')}
            >
              Weekly
            </Button>
            <Button 
              variant={timeRange === 'monthly' ? 'default' : 'ghost'} 
              size="sm" 
              className={cn(
                "h-8 text-xs",
                timeRange === 'monthly' ? 'bg-lv-gold text-white hover:bg-lv-gold/90' : 'text-muted-foreground'
              )}
              onClick={() => setTimeRange('monthly')}
            >
              Monthly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) => `R${value / 1000}k`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [
                  `R${new Intl.NumberFormat().format(value as number)}`,
                  "",
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="johannesburg" 
                name="Johannesburg" 
                fill="#4E3829" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="capeTown" 
                name="Cape Town" 
                fill="#B99F65" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
