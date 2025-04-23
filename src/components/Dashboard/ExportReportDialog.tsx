import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getStoreData, 
  getTransactionsByStore,
  getActivitiesByStore,
  transactionsData,
  activitiesData
} from "@/data/dashboardData";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from "@react-pdf/renderer";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, DownloadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRevenueData } from "@/data/dashboardData";
import { getProductMetrics } from "@/data/productData";
import { Transaction } from "@/components/Dashboard/TransactionsTable";
import { pdf } from "@react-pdf/renderer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metric: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  metricLabel: {
    width: '50%',
    fontSize: 12,
  },
  metricValue: {
    width: '50%',
    fontSize: 12,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    paddingHorizontal: 5,
  },
});

// PDF Document Component
const SalesReportPDF = ({ data, store, dateRange }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Sales Report</Text>
        <Text style={styles.subtitle}>{store} - {dateRange}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Total Sales:</Text>
          <Text style={styles.metricValue}>${data.totalSales.toLocaleString()}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Sales Count:</Text>
          <Text style={styles.metricValue}>{data.salesCount}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Average Order Value:</Text>
          <Text style={styles.metricValue}>${data.averageOrder.toLocaleString()}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>New Customers:</Text>
          <Text style={styles.metricValue}>{data.newCustomers}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const TransactionsReportPDF = ({ data, store, dateRange }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions Report</Text>
        <Text style={styles.subtitle}>{store} - {dateRange}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>ID</Text>
            <Text style={styles.tableCell}>Product</Text>
            <Text style={styles.tableCell}>Customer</Text>
            <Text style={styles.tableCell}>Amount</Text>
            <Text style={styles.tableCell}>Status</Text>
          </View>
          {data.map((transaction) => (
            <View key={transaction.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{transaction.id}</Text>
              <Text style={styles.tableCell}>{transaction.productName}</Text>
              <Text style={styles.tableCell}>{transaction.customer}</Text>
              <Text style={styles.tableCell}>${transaction.amount.toLocaleString()}</Text>
              <Text style={styles.tableCell}>{transaction.status}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const ActivitiesReportPDF = ({ data, store, dateRange }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Activities Report</Text>
        <Text style={styles.subtitle}>{store} - {dateRange}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>ID</Text>
            <Text style={styles.tableCell}>Title</Text>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Type</Text>
            <Text style={styles.tableCell}>Timestamp</Text>
          </View>
          {data.map((activity) => (
            <View key={activity.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{activity.id}</Text>
              <Text style={styles.tableCell}>{activity.title}</Text>
              <Text style={styles.tableCell}>{activity.description}</Text>
              <Text style={styles.tableCell}>{activity.type}</Text>
              <Text style={styles.tableCell}>{activity.timestamp}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

interface ExportReportDialogProps {
  trigger: React.ReactNode;
  selectedStore: string;
}

type ReportType = "sales" | "reconciliation" | "products";
type ExportFormat = "pdf" | "csv";

export function ExportReportDialog({ trigger, selectedStore }: ExportReportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reportType, setReportType] = useState<ReportType>("sales");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("pdf");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(value);
  };

  const handleExport = async () => {
    if (!selectedStore || !startDate || !endDate) return;

    const filteredTransactions = getTransactionsByStore(selectedStore).filter(
      (transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      }
    );

    const metrics = getProductMetrics();
    const totalSales = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalTransactions = filteredTransactions.length;
    const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;

    // Calculate top products
    const topProducts = filteredTransactions
      .reduce((acc, t) => {
        const existing = acc.find(p => p.name === t.productName);
        if (existing) {
          existing.sales += t.amount;
          existing.quantity += 1;
        } else {
          acc.push({
            id: t.id,
            name: t.productName,
            sales: t.amount,
            quantity: 1
          });
        }
        return acc;
      }, [] as { id: string; name: string; sales: number; quantity: number }[])
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    if (exportFormat === "pdf") {
      const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>Sales Report</Text>
              <Text style={styles.subtitle}>
                {selectedStore} - {format(startDate, "MMM d, yyyy")} to{" "}
                {format(endDate, "MMM d, yyyy")}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Total Sales:</Text>
                <Text style={styles.metricValue}>
                  {formatCurrency(totalSales)}
                </Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Total Transactions:</Text>
                <Text style={styles.metricValue}>{totalTransactions}</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Average Transaction:</Text>
                <Text style={styles.metricValue}>
                  {formatCurrency(averageTransaction)}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Top Products</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCell}>Product</Text>
                  <Text style={styles.tableCell}>Sales</Text>
                  <Text style={styles.tableCell}>Quantity</Text>
                </View>
                {topProducts.map((product) => (
                  <View key={product.id} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{product.name}</Text>
                    <Text style={styles.tableCell}>
                      {formatCurrency(product.sales)}
                    </Text>
                    <Text style={styles.tableCell}>{product.quantity}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCell}>Date</Text>
                  <Text style={styles.tableCell}>Product</Text>
                  <Text style={styles.tableCell}>Amount</Text>
                  <Text style={styles.tableCell}>Status</Text>
                </View>
                {filteredTransactions.slice(0, 10).map((transaction) => (
                  <View key={transaction.id} style={styles.tableRow}>
                    <Text style={styles.tableCell}>
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </Text>
                    <Text style={styles.tableCell}>{transaction.productName}</Text>
                    <Text style={styles.tableCell}>
                      {formatCurrency(transaction.amount)}
                    </Text>
                    <Text style={styles.tableCell}>{transaction.status}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Page>
        </Document>
      );

      const blob = await pdf(<MyDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sales-report-${selectedStore}-${format(
        startDate,
        "yyyy-MM-dd"
      )}-${format(endDate, "yyyy-MM-dd")}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      // CSV export logic
      const csvContent = [
        ["Sales Report"],
        [selectedStore],
        [`${format(startDate, "MMM d, yyyy")} to ${format(endDate, "MMM d, yyyy")}`],
        [],
        ["Summary"],
        ["Total Sales", formatCurrency(totalSales)],
        ["Total Transactions", totalTransactions],
        ["Average Transaction", formatCurrency(averageTransaction)],
        [],
        ["Top Products"],
        ["Product", "Sales", "Quantity"],
        ...topProducts.map((product) => [
          product.name,
          formatCurrency(product.sales),
          product.quantity,
        ]),
        [],
        ["Recent Transactions"],
        ["Date", "Product", "Amount", "Status"],
        ...filteredTransactions.slice(0, 10).map((transaction) => [
          format(new Date(transaction.date), "MMM d, yyyy"),
          transaction.productName,
          formatCurrency(transaction.amount),
          transaction.status,
        ]),
      ];

      const csv = csvContent.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sales-report-${selectedStore}-${format(
        startDate,
        "yyyy-MM-dd"
      )}-${format(endDate, "yyyy-MM-dd")}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }

    setIsOpen(false);
  };

  const renderPDFPreview = () => {
    const storeData = getStoreData(selectedStore);
    let PDFComponent;

    switch (reportType) {
      case "sales":
        PDFComponent = (
          <SalesReportPDF
            data={{
              totalSales: storeData.revenue[storeData.revenue.length - 1],
              salesCount: storeData.salesCount,
              averageOrder: storeData.averageOrder,
              newCustomers: storeData.newCustomers
            }}
            store={selectedStore}
            dateRange={`${format(startDate!, 'PPP')} - ${format(endDate!, 'PPP')}`}
          />
        );
        break;
      case "reconciliation":
        PDFComponent = (
          <TransactionsReportPDF
            data={getTransactionsByStore(selectedStore)}
            store={selectedStore}
            dateRange={`${format(startDate!, 'PPP')} - ${format(endDate!, 'PPP')}`}
          />
        );
        break;
      case "products":
        PDFComponent = (
          <ActivitiesReportPDF
            data={getActivitiesByStore(selectedStore)}
            store={selectedStore}
            dateRange={`${format(startDate!, 'PPP')} - ${format(endDate!, 'PPP')}`}
          />
        );
        break;
      default:
        return null;
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4 w-[90%] h-[90%]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">PDF Preview</h2>
            <Button
              variant="outline"
              onClick={() => setShowPDFPreview(false)}
            >
              Close
            </Button>
          </div>
          <PDFViewer className="w-full h-[calc(100%-4rem)]">
            {PDFComponent}
          </PDFViewer>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
          <DialogDescription>
            Select the report type, date range, and format for export.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reportType" className="text-right">
              Report Type
            </Label>
            <Select
              value={reportType}
              onValueChange={(value) => setReportType(value as ReportType)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="reconciliation">Reconciliation</SelectItem>
                <SelectItem value="products">Products</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="format" className="text-right">
              Format
            </Label>
            <Select
              value={exportFormat}
              onValueChange={(value) => setExportFormat(value as ExportFormat)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleExport}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
      {showPDFPreview && renderPDFPreview()}
    </Dialog>
  );
}
