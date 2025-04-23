import { useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { AddProductDialog } from "@/components/Dashboard/AddProductDialog";
import { ExportReportDialog } from "@/components/Dashboard/ExportReportDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  SearchIcon, 
  FilterIcon, 
  ChevronDownIcon,
  PackageIcon,
  ShoppingBagIcon,
  AlertCircleIcon,
  DollarSignIcon,
  BarChartIcon,
  StoreIcon,
  FileDownIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  products, 
  categories, 
  getProductMetrics,
  type Product,
  type Category
} from "@/data/productData";
import { storeLocations } from "@/data/dashboardData";

interface Store {
  id: string;
  name: string;
  location: string;
  description: string;
  productCount: number;
  totalSales: number;
}

export default function StorePerformancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStore, setSelectedStore] = useState("All Stores");
  const [stores, setStores] = useState<Store[]>([
    {
      id: "s1",
      name: "Sandton City",
      location: "Johannesburg",
      description: "Flagship store in Sandton City Mall",
      productCount: 120,
      totalSales: 2500000,
    },
    {
      id: "s2",
      name: "V&A Waterfront",
      location: "Cape Town",
      description: "Premium store in V&A Waterfront",
      productCount: 95,
      totalSales: 1800000,
    },
  ]);
  const itemsPerPage = 5;

  const metrics = getProductMetrics();
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80";
      case "out_of_stock":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
      case "discontinued":
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      default:
        return "";
    }
  };

  const handleProductAdded = (newProduct: Omit<Product, "id" | "sales" | "status">) => {
    // In a real app, this would be an API call
    console.log("New product added:", newProduct);
  };

  return (
    <DashboardLayout
      title="Store Performance"
      description="Monitor and manage store performance"
      selectedStore={selectedStore}
      onStoreChange={setSelectedStore}
      hideStoreSelector={true}
    >
      <div className="animate-fade-in">
        {/* Store Selection */}
        <div className="mb-6">
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-[200px]">
              <StoreIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select a store" />
            </SelectTrigger>
            <SelectContent>
              {storeLocations.map((store) => (
                <SelectItem key={store} value={store}>
                  {store}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Store Metrics Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <MetricCard
            title="Total Products"
            value={metrics.totalProducts.toString()}
            change={8.2}
            changeText="vs last month"
            icon={<PackageIcon className="h-4 w-4" />}
          />
          <MetricCard
            title="Total Sales"
            value={formatCurrency(metrics.totalSales)}
            change={12.5}
            changeText="vs last month"
            icon={<DollarSignIcon className="h-4 w-4" />}
          />
          <MetricCard
            title="Average Order"
            value={formatCurrency(metrics.averagePrice)}
            change={5.7}
            changeText="vs last month"
            icon={<ShoppingBagIcon className="h-4 w-4" />}
          />
          <MetricCard
            title="Conversion Rate"
            value="3.2%"
            change={0.8}
            changeText="vs last month"
            icon={<BarChartIcon className="h-4 w-4" />}
          />
        </div>

        {/* Store Details Section */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Store Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {stores.map((store) => (
                <Card key={store.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <StoreIcon className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">{store.name}</h3>
                      </div>
                      <Badge variant="outline">{store.location}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{store.description}</p>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{store.productCount}</p>
                        <p className="text-muted-foreground">Products</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(store.totalSales)}</p>
                        <p className="text-muted-foreground">Total Sales</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Store Products</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <AddProductDialog onProductAdded={handleProductAdded} categories={categories} />
              <ExportReportDialog 
                trigger={
                  <Button variant="outline">
                    <FileDownIcon className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                }
                selectedStore={selectedStore}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-4 px-0">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                        No products found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentProducts.map((product) => (
                      <TableRow key={product.id} className="group hover:bg-muted/30">
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn("capitalize", getStatusColor(product.status))}
                          >
                            {product.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(value);
} 