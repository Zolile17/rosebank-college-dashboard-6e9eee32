import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Transaction } from "@/components/Dashboard/TransactionsTable";
import { useEffect, useState } from "react";

interface TransactionsGraphProps {
  transactions: Transaction[];
  className?: string;
}

interface TransactionsByDate {
  date: string;
  count: number;
}

// Default data to show when there are no transactions
const defaultGraphData = [
  { date: "2025-04-03", count: 85 },
  { date: "2025-04-04", count: 102 },
  { date: "2025-04-05", count: 145 },
  { date: "2025-04-06", count: 168 },
  { date: "2025-04-07", count: 172 },
  { date: "2025-04-08", count: 189 },
  { date: "2025-04-09", count: 216 },
  { date: "2025-04-10", count: 253 },
];

export function TransactionsGraph({ transactions, className }: TransactionsGraphProps) {
  const [graphData, setGraphData] = useState<TransactionsByDate[]>(defaultGraphData);

  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      setGraphData(defaultGraphData);
      return;
    }
    
    // Group transactions by date and count them
    const transactionsByDate = transactions.reduce((acc: Record<string, number>, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += 1;
      return acc;
    }, {});

    // Convert to array for the chart
    const dataArray = Object.entries(transactionsByDate).map(([date, count]) => ({
      date,
      count,
    }));

    // Sort by date
    dataArray.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    // Use default data if no transactions were processed
    setGraphData(dataArray.length > 0 ? dataArray : defaultGraphData);
  }, [transactions]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card text-card-foreground p-3 shadow rounded border border-border">
          <p className="text-sm font-medium">{formatDate(label)}</p>
          <p className="text-sm font-medium text-lv-gold">
            {payload[0].value} transactions
          </p>
        </div>
      );
    }
    return null;
  };

  // Find min value in data to set Y-axis min value
  const minCount = Math.min(...graphData.map(item => item.count));
  // Set the baseline to be approximately 70-80% of the minimum value
  // This makes the bars look taller while still showing the relative differences
  const baselineValue = Math.floor(minCount * 0.7);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Transaction Volume</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2DED5" />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 12 }}
                stroke="#7C7166"
                tickFormatter={formatDate}
              />
              <YAxis 
                stroke="#7C7166"
                // Set custom domain to start at a higher baseline
                domain={[baselineValue, 'auto']}
                // Include fewer ticks to emphasize the data points
                tickCount={4}
                // Add a label to indicate values
                label={{ 
                  value: 'Transactions', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Transactions" 
                fill="#B99F65" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="transactionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B99F65" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#B99F65" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}