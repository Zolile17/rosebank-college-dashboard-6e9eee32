
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { ReconciliationTable } from "@/components/Dashboard/ReconciliationTable";
import { StoreComparisonChart } from "@/components/Dashboard/StoreComparisonChart";
import { ExportReportDialog } from "@/components/Dashboard/ExportReportDialog";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";
import { ActivityFeed } from "@/components/Dashboard/ActivityFeed";
import { TransactionsGraph } from "@/components/Dashboard/TransactionsGraph";
import { 
  BarChart3Icon, 
  CircleDollarSignIcon, 
  FileDownIcon,
  ShoppingBagIcon, 
  UsersIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  getStoreData, 
  getRevenueData, 
  getTransactionsByStore,
  getActivitiesByStore
} from "@/data/dashboardData";

// Mock data for store comparison
const storeComparisonData = [
  { name: "Mon", johannesburg: 40000, capeTown: 24000 },
  { name: "Tue", johannesburg: 30000, capeTown: 27000 },
  { name: "Wed", johannesburg: 45000, capeTown: 33000 },
  { name: "Thu", johannesburg: 50000, capeTown: 29000 },
  { name: "Fri", johannesburg: 65000, capeTown: 43000 },
  { name: "Sat", johannesburg: 75000, capeTown: 55000 },
  { name: "Sun", johannesburg: 60000, capeTown: 40000 },
];

interface DashboardContentProps {
  selectedStore: string;
}

const DashboardContent = ({ selectedStore }: DashboardContentProps) => {
  const [userRole, setUserRole] = useState<"admin" | "store-manager">("admin");
  const [storeMetrics, setStoreMetrics] = useState(getStoreData(selectedStore));
  const [revenueData, setRevenueData] = useState(getRevenueData(selectedStore));
  const [filteredTransactions, setFilteredTransactions] = useState(getTransactionsByStore(selectedStore));
  const [filteredActivities, setFilteredActivities] = useState(getActivitiesByStore(selectedStore));

  useEffect(() => {
    setStoreMetrics(getStoreData(selectedStore));
    setRevenueData(getRevenueData(selectedStore));
    setFilteredTransactions(getTransactionsByStore(selectedStore));
    setFilteredActivities(getActivitiesByStore(selectedStore));
  }, [selectedStore]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ZAR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-medium text-lv-brown">
            {selectedStore === "All Stores" ? "Dashboard Overview" : `${selectedStore} Dashboard`}
          </h1>
          <p className="text-muted-foreground">
            Welcome back to your Louis Vuitton sales overview
          </p>
        </div>
        <ExportReportDialog 
          trigger={
            <Button className="bg-lv-gold hover:bg-lv-gold/90 text-black">
              <FileDownIcon className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          }
          selectedStore={selectedStore}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard
          title="Total Sales"
          value={formatCurrency(storeMetrics.revenue[storeMetrics.revenue.length - 1])}
          icon={<CircleDollarSignIcon className="h-4 w-4" />}
          change={12}
          changeText="from yesterday"
        />
        <MetricCard
          title="Sales Count"
          value={storeMetrics.salesCount.toString()}
          icon={<BarChart3Icon className="h-4 w-4" />}
          change={5.3}
          changeText="from last week"
        />
        <MetricCard
          title="Average Order"
          value={formatCurrency(storeMetrics.averageOrder)}
          icon={<ShoppingBagIcon className="h-4 w-4" />}
          change={-2.3}
          changeText="from yesterday"
        />
        <MetricCard
          title="New Customers"
          value={storeMetrics.newCustomers.toString()}
          icon={<UsersIcon className="h-4 w-4" />}
          change={8.1}
          changeText="from yesterday"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
        <div className="col-span-1 lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
        <div className="col-span-1 lg:col-span-2">
          <TransactionsGraph transactions={filteredTransactions} />
        </div>
        <div className="col-span-1">
          <ActivityFeed activities={filteredActivities} />
        </div>
      </div>

      <div className="mt-8 text-xs text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} Louis Vuitton. All rights reserved.</p>
      </div>
    </div>
  );
};

const Index = () => {
  const [selectedStore, setSelectedStore] = useState("All Stores");

  return (
    <DashboardLayout
      title="Dashboard Overview"
      description="Welcome to your sales overview"
      selectedStore={selectedStore}
      onStoreChange={setSelectedStore}
    >
      <DashboardContent selectedStore={selectedStore} />
    </DashboardLayout>
  );
};

export default Index;
