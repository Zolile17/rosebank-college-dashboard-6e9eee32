
import { ActivityItem } from "@/components/Dashboard/ActivityFeed";
import { Transaction as ReconciliationTransaction } from "@/components/Dashboard/ReconciliationTable";
import { Transaction as TransactionsTableTransaction } from "@/components/Dashboard/TransactionsTable";

// Export store data type
export interface StoreData {
  revenue: number[];
  salesCount: number;
  averageOrder: number;
  newCustomers: number;
}

// Export revenue data point type
export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

// Re-export transaction types for convenience
export type { 
  ReconciliationTransaction,
  TransactionsTableTransaction
};

// Export activity type with store location
export type StoreActivity = ActivityItem & { storeLocation?: string };
