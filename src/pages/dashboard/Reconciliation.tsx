
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { ReconciliationTable, Transaction } from "@/components/Dashboard/ReconciliationTable";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { DownloadIcon, FilterIcon, FileDownIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { getTransactionsByStore } from "@/data/dashboardData";
import { ExportReportDialog } from "@/components/Dashboard/ExportReportDialog";

export default function ReconciliationPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 2, 1),
    to: new Date(2025, 2, 14),
  });
  const [selectedStore, setSelectedStore] = useState("All Stores");

  // Explicitly type the transactions as Transaction[] from ReconciliationTable testing
  const filteredTransactions = getTransactionsByStore(selectedStore) as Transaction[];

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(value);
  };

  return (
    <DashboardLayout
      title="Payment Reconciliation"
      description="Review and reconcile transactions across all stores"
      selectedStore={selectedStore}
      onStoreChange={setSelectedStore}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-[300px]"
            />
            <Button variant="outline" size="sm">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <ExportReportDialog 
            trigger={
              <Button variant="outline" size="sm">
                <FileDownIcon className="mr-2 h-4 w-4" />
                Export
              </Button>
            }
            selectedStore={selectedStore}
          />
        </div>

        <div className="grid gap-4">
          <ReconciliationTable 
            transactions={filteredTransactions}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
