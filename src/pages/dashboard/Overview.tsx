
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { FilterIcon, CircleDollarSignIcon, BarChart3Icon, UsersIcon, FileDownIcon, Banknote } from "lucide-react";
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
  const [selectedCampus, setSelectedCampus] = useState("All Campuses");
  const [campusMetrics, setCampusMetrics] = useState(getStoreData(selectedCampus));
  const [revenueData, setRevenueData] = useState(getRevenueData(selectedCampus));
  const [filteredTransactions, setFilteredTransactions] = useState(getTransactionsByStore(selectedCampus));

  useEffect(() => {
    setCampusMetrics(getStoreData(selectedCampus));
    setRevenueData(getRevenueData(selectedCampus));
    setFilteredTransactions(getTransactionsByStore(selectedCampus));
  }, [selectedCampus]);

  const filteredRevenueData = revenueData.filter((item) => {
    const itemDate = parseISO(item.date);
    return dateRange.from && dateRange.to 
      ? isWithinInterval(itemDate, { start: dateRange.from, end: dateRange.to })
      : true;
  });

  const totalRevenue = filteredRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalPayments = campusMetrics.paymentsCount;
  const averagePayment = campusMetrics.averagePayment;
  const transactionsCount = campusMetrics.transactionsCount;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(value);
  };

  return (
    <DashboardLayout
      title="Dashboard Overview"
      description="Student payments tracking and analysis"
      selectedStore={selectedCampus}
      onStoreChange={setSelectedCampus}
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
              <Button className="bg-rc-red hover:bg-rc-red/90 text-white">
                <FileDownIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            }
            selectedStore={selectedCampus}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            change={12.5}
            changeText="vs last period"
            icon={<Banknote className="w-6 h-6 text-rc-red" />}
          />
          <MetricCard
            title="Number of Payments"
            value={totalPayments.toString()}
            change={8.2}
            changeText="vs last period"
            icon={<BarChart3Icon className="h-4 w-4 text-rc-red" />}
          />
          <MetricCard
            title="Average Revenue"
            value={formatCurrency(averagePayment)}
            change={4.1}
            changeText="vs last period"
            icon={<CircleDollarSignIcon className="h-4 w-4 text-rc-red" />}
          />
          <MetricCard
            title="Number of Transactions"
            value={transactionsCount.toString()}
            change={15.3}
            changeText="vs last period"
            icon={<UsersIcon className="h-4 w-4 text-rc-red" />}
          />
        </div>

        <div className="grid gap-4 mt-8">
          <RevenueChart 
            title="Payments Over Time" 
            data={filteredRevenueData} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
} 
