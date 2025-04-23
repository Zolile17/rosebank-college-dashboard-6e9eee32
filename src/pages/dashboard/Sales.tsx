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
import { useState, useMemo } from "react";
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

  // Generate high-volume revenue data locally
  const revenueData = useMemo(() => {
    // Generate date range for the past 14 days
    const days = 14;
    const result = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' });
      
      // Generate random count between 400-2000 payments per day
      let multiplier = 1;
      if (selectedCampus === "Cape Town") multiplier = 1.2;
      if (selectedCampus === "Braamfontein") multiplier = 1.5;
      if (selectedCampus === "Durban") multiplier = 0.8;
      if (selectedCampus === "Pretoria") multiplier = 0.9;
      if (selectedCampus === "Polokwane") multiplier = 0.7;
      
      const revenue = Math.floor(Math.random() * 1600 + 400) * multiplier;
      
      result.unshift({
        date: formattedDate,
        revenue: Math.round(revenue)
      });
    }
    
    return result;
  }, [selectedCampus]);

  // Generate synthetic transactions data locally
  const transactions = useMemo(() => {
    const campuses = ["Cape Town", "Braamfontein", "Durban", "Pretoria", "Polokwane"];
    const paymentTypes = ["Card", "EFT", "Instant", "Cash"];
    
    // Define distribution of payment types (approximate percentages)
    const paymentTypeDistribution = {
      "Card": 0.45,  // 45% of payments
      "EFT": 0.30,   // 30% of payments
      "Instant": 0.15,  // 15% of payments
    
    
    };
    
    // Generate synthetic transactions
    const result = [];
    const totalTransactions = 5000; // Large number of transactions
    
    for (let i = 0; i < totalTransactions; i++) {
      // If campus is selected, only use that campus; otherwise randomly select
      const campus = selectedCampus !== "All Campuses" ? 
        selectedCampus : 
        campuses[Math.floor(Math.random() * campuses.length)];
      
      // Select payment type based on distribution
      const rand = Math.random();
      let cumulativeProb = 0;
      let paymentType = paymentTypes[0];
      
      for (const [type, prob] of Object.entries(paymentTypeDistribution)) {
        cumulativeProb += prob;
        if (rand <= cumulativeProb) {
          paymentType = type;
          break;
        }
      }
      
      // Generate transaction amount (between R500 and R50,000)
      const amount = Math.floor(Math.random() * 49500) + 500;
      
      result.push({
        id: `T${i}`,
        campus: campus,
        paymentType: paymentType,
        amount: amount
      });
    }
    
    return result;
  }, [selectedCampus]);

  // Group transactions by payment method
  const paymentMethodData = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
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
  }, [transactions]);

  // Group transactions by campus for top performing campuses
  const campusData = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
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
  }, [transactions]);

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