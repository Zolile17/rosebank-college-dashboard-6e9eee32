import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import DashboardPage from "@/pages/Index";
import OverviewPage from "@/pages/dashboard/Overview";
import SalesPage from "@/pages/dashboard/Sales";
import ReconciliationPage from "@/pages/dashboard/Reconciliation";
import ProductsPage from "@/pages/dashboard/Products";
import CustomersPage from "@/pages/dashboard/Customers";
import StorePerformancePage from "@/pages/dashboard/StorePerformance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ✅ Add basename for GitHub Pages */}
      <Router basename="/Rosebank-College-Dashboard">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<OverviewPage />} />
          <Route path="/dashboard/" element={<OverviewPage />} />
          <Route path="/dashboard/overview" element={<OverviewPage />} />
          <Route path="/dashboard/sales" element={<SalesPage />} />
          <Route
            path="/dashboard/reconciliation"
            element={<ReconciliationPage />}
          />
          <Route path="/dashboard/products" element={<ProductsPage />} />
          <Route path="/dashboard/customers" element={<CustomersPage />} />
          <Route
            path="/dashboard/store-performance"
            element={<StorePerformancePage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
