
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
  const [selectedCampus, setSelectedCampus] = useState("All Campuses");

  const revenueData = getRevenueData(selectedCampus);
  const transactions = getTransactionsByStore(selectedCampus);

  // Group transactions by payment method
  const paymentMethodData = transactions.reduce((acc, transaction) => {
    const existing = acc.find(p => p.name === transaction.paymentType);
    if (existing) {
      existing.count += 1;
      existing.value += transaction.amount;
    } else {
      acc.push({
        name: transaction.paymentType,
        count: 1,
        value: transaction.amount
      });
    }
    return acc;
  }, [] as { name: string; count: number; value: number }[]);

  // Group transactions by campus for top performing campuses
  const campusData = transactions.reduce((acc, transaction) => {
    const existing = acc.find(p => p.name === transaction.campus);
    if (existing) {
      existing.transactions += 1;
      existing.revenue += transaction.amount;
    } else {
      acc.push({
        name: transaction.campus,
        transactions: 1,
        revenue: transaction.amount
      });
    }
    return acc;
  }, [] as { name: string; transactions: number; revenue: number }[])
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 5);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(value);
  };

  const chartColors = ["#ea384c", "#000000", "#555555", "#777777", "#999999"];

  return (
    <DashboardLayout
      title="Payment Reports"
      description="Analyse and track student payment performance"
      selectedStore={selectedCampus}
      onStoreChange={setSelectedCampus}
    >
      <div className="animate-fade-in">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-medium text-rc-red">
              Payment Reports
            </h1>
            <p className="text-muted-foreground">
              Overview of daily payments and campus performance
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
                <Button className="bg-rc-red hover:bg-rc-red/90 text-white">
                  <FileDownIcon className="h-4 w-4 mr-2" />
                  Export
                </Button>
              }
              selectedStore={selectedCampus}
            />
          </div>
        </div>

        {/* Top Row */}
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          {/* Daily Payments Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Payments per Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${value}`} />
                    <Tooltip formatter={(value: number) => [`${value} payments`, "Count"]} />
                    <Bar dataKey="revenue" name="Number of Payments" fill="#ea384c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#ea384c"
                    >
                      {paymentMethodData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) =>
                        [`${value} payments`, name]
                      }
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row: Top Performing Campuses */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campuses by Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campusData.map((campus) => (
                  <div key={campus.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{campus.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {campus.transactions} transactions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(campus.revenue)}</p>
                      <p className="text-sm text-muted-foreground">
                        {(
                          (campus.revenue /
                            campusData.reduce((sum, p) => sum + p.revenue, 0)) *
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
