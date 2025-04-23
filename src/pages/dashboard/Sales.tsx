
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterIcon, FileDownIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { addDays } from "date-fns";
import { ExportReportDialog } from "@/components/Dashboard/ExportReportDialog";
import { getRevenueData, getTransactionsByStore } from "@/data/dashboardData";
import { DateRange } from "react-day-picker";

export default function SalesPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [selectedStore, setSelectedStore] = useState("All Stores");

  const revenueData = getRevenueData(selectedStore);
  const transactions = getTransactionsByStore(selectedStore);

  const topProducts = transactions
    .reduce((acc, transaction) => {
      const existing = acc.find(p => p.name === transaction.productName);
      if (existing) {
        existing.sales += transaction.amount;
        existing.units += 1;
      } else {
        acc.push({
          name: transaction.productName,
          sales: transaction.amount,
          units: 1
        });
      }
      return acc;
    }, [] as { name: string; sales: number; units: number }[])
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(value);
  };

  const pieColors = ["#D4AF37", "#b9972c", "#a58326", "#93701f", "#7f5e18"];

  return (
    <DashboardLayout
      title="Payment Reports"
      description="Analyse and track your sales performance"
      selectedStore={selectedStore}
      onStoreChange={setSelectedStore}
    >
      <div className="animate-fade-in">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-medium text-lv-brown">
              Payment Reports
            </h1>
            <p className="text-muted-foreground">
              Overview of daily revenue and top performing products
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Button variant="outline">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <ExportReportDialog
              trigger={
                <Button className="bg-lv-gold hover:bg-lv-gold/90 text-black">
                  <FileDownIcon className="h-4 w-4 mr-2" />
                  Export
                </Button>
              }
              selectedStore={selectedStore}
            />
          </div>
        </div>

        {/* Top Row */}
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          {/* Daily Sales Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="revenue" fill="#D4AF37" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Product Sales Distribution Pie Chart - Moved up */}
          <Card>
            <CardHeader>
              <CardTitle>Product Revenue Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topProducts}
                      dataKey="sales"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#D4AF37"
                    >
                      {topProducts.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) =>
                        [`${formatCurrency(value)}`, name]
                      }
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row: Top Products List - Moved downsss */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.units} units sold
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(product.sales)}</p>
                      <p className="text-sm text-muted-foreground">
                        {(
                          (product.sales /
                            topProducts.reduce((sum, p) => sum + p.sales, 0)) *
                          100
                        ).toFixed(1)}
                        % of total
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
