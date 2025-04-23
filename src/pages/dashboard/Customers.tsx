import { useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  PlusIcon,
  PackageIcon,
  ShoppingBagIcon,
  AlertCircleIcon,
  DollarSignIcon,
  BarChartIcon,
  StoreIcon,
  FileDownIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  products as initialProducts,
  categories,
  getProductMetrics,
  type Product,
  type Category,
} from "@/data/productData";
// import { AddStoreDialog } from "@/components/Dashboard/AddStoreDialog";
// import { ExportReportDialog } from "@/components/Dashboard/ExportReportDialog";
// import { AddProductDialog } from "@/components/Dashboard/AddProductDialog";

interface Store {
  id: string;
  name: string;
  location: string;
  description: string;
  productCount: number;
  totalSales: number;
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStore, setSelectedStore] = useState("All Stores");
  // const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
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
  // const filteredCustomer = customers.filter((customer) => {
  //   const matchesSearch =
  //     customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     customer.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesCategory =
  //     selectedCategory === null || customer.category === selectedCategory;
  //   return matchesSearch && matchesCategory;
  // });

  // const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

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

  // const handleStoreAdded = (
  //   newStore: Omit<Store, "id" | "productCount" | "totalSales">
  // ) => {
  //   const store: Store = {
  //     ...newStore,
  //     id: `s${stores.length + 1}`,
  //     productCount: 0,
  //     totalSales: 0,
  //   };
  //   setStores([...stores, store]);
  // };

  // const handleProductAdded = (
  //   newProduct: Omit<Product, "id" | "sales" | "status" | "lastUpdated">
  // ) => {
  //   const product: Product = {
  //     ...newProduct,
  //     id: `p${products.length + 1}`,
  //     sales: 0,
  //     status: newProduct.stock > 0 ? "active" : "out_of_stock",
  //     lastUpdated: new Date().toISOString().split("T")[0],
  //   };
  //   setProducts([...products, product]);
  // };

  // const formatCurrency = (value: number): string => {
  //   return new Intl.NumberFormat("en-ZA", {
  //     style: "currency",
  //     currency: "ZAR",
  //   }).format(value);
  // };

  return (
    <DashboardLayout
      title="Customers"
      description="Manage your customers"
      selectedStore={selectedStore}
      onStoreChange={setSelectedStore}
    >
      <div className="animate-fade-in">
        {/* Metrics Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <MetricCard
            title="Total Customers"
            value={metrics.totalProducts.toString()}
            change={8.2}
            changeText="vs last month"
            icon={<PackageIcon className="h-4 w-4" />}
          />
          <MetricCard
            title="Total Employees"
            value={metrics.totalStock.toString()}
            change={-3.1}
            changeText="vs last month"
            icon={<ShoppingBagIcon className="h-4 w-4" />}
          />
          <MetricCard
            title="Absenteeism"
            value={metrics.outOfStock.toString()}
            change={2.5}
            changeText="vs last month"
            icon={<AlertCircleIcon className="h-4 w-4" />}
          />
          {/* <MetricCard
            title="Average Price"
            value={formatCurrency(metrics.averagePrice)}
            change={5.7}
            changeText="vs last month"
            icon={<DollarSignIcon className="h-4 w-4" />}
          /> */}
        </div>

        {/* Stores Section */}
        {/* <Card className="mb-6">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Stores</CardTitle>
            <AddStoreDialog onStoreAdded={handleStoreAdded} />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {stores.map((store) => (
                <Card
                  key={store.id}
                  className="group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <StoreIcon className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">{store.name}</h3>
                      </div>
                      <Badge variant="outline">{store.location}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {store.description}
                    </p>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{store.productCount}</p>
                        <p className="text-muted-foreground">Customers</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(store.totalSales)}
                        </p>
                        <p className="text-muted-foreground">Total Sales</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Categories Section */}
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {users.map((user) => (
            <Card
              key={user.id}
              className="group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.productCount} products
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(user.totalSales)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* Products Section */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Users</CardTitle>
            {/* <div className="flex items-center space-x-2">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Category
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                    All Users
                  </DropdownMenuItem>
                  {users.map((user) => (
                    <DropdownMenuItem
                      key={user.id}
                      onClick={() => setSelectedCategory(user.name)}
                    >
                      {users.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <AddProductDialog
                onProductAdded={handleProductAdded}
                categories={users}
              />
              <ExportReportDialog
                trigger={
                  <Button variant="outline">
                    <FileDownIcon className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                }
                selectedStore={selectedStore}
              />
            </div> */}
          </CardHeader>
          <CardContent className="pt-4 px-0">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Surname</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Location
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Contact Details
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Gender</TableHead>
                    <TableHead className="whitespace-nowrap">
                      ID Number
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-muted/30">
                    <TableCell className="font-medium">Sabelo</TableCell>
                    <TableCell>Miya</TableCell>
                    <TableCell>Durban</TableCell>
                    <TableCell>0782229877</TableCell>
                    <TableCell>Male</TableCell>
                    <TableCell>9710305628084</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-muted/30">
                    <TableCell className="font-medium">Thato</TableCell>
                    <TableCell>Lebeer</TableCell>
                    <TableCell>Johannesburg</TableCell>
                    <TableCell>0731234567</TableCell>
                    <TableCell>Female</TableCell>
                    <TableCell>9505121234567</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-muted/30">
                    <TableCell className="font-medium">Banele</TableCell>
                    <TableCell>Mgwevu</TableCell>
                    <TableCell>Cape Town</TableCell>
                    <TableCell>0824567890</TableCell>
                    <TableCell>Male</TableCell>
                    <TableCell>9012045678901</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-muted/30">
                    <TableCell className="font-medium">Zolile</TableCell>
                    <TableCell>Nyambi</TableCell>
                    <TableCell>Pretoria</TableCell>
                    <TableCell>0761239876</TableCell>
                    <TableCell>Female</TableCell>
                    <TableCell>9406055868087</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-muted/30">
                    <TableCell className="font-medium">Thulani</TableCell>
                    <TableCell>Bango</TableCell>
                    <TableCell>Bloemfontein</TableCell>
                    <TableCell>0735692597</TableCell>
                    <TableCell>Male</TableCell>
                    <TableCell>9210115868082</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            {/* Pagination Controls */}
            {/* <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
