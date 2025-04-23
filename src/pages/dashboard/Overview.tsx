
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";
import { TransactionsGraph } from "@/components/Dashboard/TransactionsGraph";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { DownloadIcon, FilterIcon, CircleDollarSignIcon, BarChart3Icon, ShoppingBagIcon, UsersIcon, FileDownIcon, Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import { isWithinInterval, parseISO } from "date-fns";
import { getStoreData, getRevenueData, getTransactionsByStore, storeLocations } from "@/data/dashboardData";
import { DateRange } from "react-day-picker";
import { ExportReportDialog } from "@/components/Dashboard/ExportReportDialog";

export default function OverviewPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date("2025-03-01"),
    to: new Date("2025-03-14"),
  });
  const [selectedStore, setSelectedStore] = useState("All Stores");
  const [storeMetrics, setStoreMetrics] = useState(getStoreData(selectedStore));
  const [revenueData, setRevenueData] = useState(getRevenueData(selectedStore));
  const [filteredTransactions, setFilteredTransactions] = useState(getTransactionsByStore(selectedStore));

  useEffect(() => {
    setStoreMetrics(getStoreData(selectedStore));
    setRevenueData(getRevenueData(selectedStore));
    setFilteredTransactions(getTransactionsByStore(selectedStore));
  }, [selectedStore]);

  const filteredRevenueData = revenueData.filter((item) => {
    const itemDate = parseISO(item.date);
    return dateRange.from && dateRange.to 
      ? isWithinInterval(itemDate, { start: dateRange.from, end: dateRange.to })
      : true;
  });

  const totalRevenue = filteredRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSales = storeMetrics.salesCount;
  const averageOrder = storeMetrics.averageOrder;
  const newCustomers = storeMetrics.newCustomers;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(value);
  };

  return (
    <DashboardLayout
      title="Dashboard Overview"
      description=""
      selectedStore={selectedStore}
      onStoreChange={setSelectedStore}
    >
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-8">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            change={12.5}
            changeText="vs last period"
            icon={<Banknote className="w-6 h-6 text-gray-600" />}

          />
          <MetricCard
            title="Sales Count"
            value={totalSales.toString()}
            change={8.2}
            changeText="vs last period"
            icon={<BarChart3Icon className="h-4 w-4" />}
          />
          <MetricCard
            title="Average Revenue"
            value={formatCurrency(averageOrder)}
            change={4.1}
            changeText="vs last period"
            icon={<ShoppingBagIcon className="h-4 w-4" />}
          />
          <MetricCard
            title="Number of Transactions"
            value={newCustomers.toString()}
            change={15.3}
            changeText="vs last period"
            icon={<UsersIcon className="h-4 w-4" />}
          />
        </div>

        <div className="grid gap-4 mt-4">
          <RevenueChart data={filteredRevenueData} />
          {/* <TransactionsGraph transactions={filteredTransactions} /> */}
        </div>
      </div>
    </DashboardLayout>
  );
} 
