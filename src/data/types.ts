
// Export campus data type
export interface CampusData {
  revenue: number[];
  paymentsCount: number;
  averagePayment: number;
  transactionsCount: number;
  salesCount: number;
  averageOrder: number;
  newCustomers: number;
}

// Export revenue data point type
export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

// Updated: Added studentId and iieFaculty fields
export interface ReconciliationTransaction {
  id: string;
  studentId: string;
  studentReference: string;
  firstName: string;
  lastName: string;
  email: string;
  campus: string;
  payerFirstName: string;
  amount: number;
  timestamp: string;
  paymentType: string;
  status: "successful" | "failed" | "pending";
  rrn?: string;
  cardNumber?: string;
  iieFaculty?: string;
}

export interface TransactionsTableTransaction {
  id: string;
  studentId: string;
  studentReference: string;
  firstName: string;
  lastName: string;
  email: string;
  campus: string;
  payerFirstName: string;
  payerLastName: string;
  paymentType: string;
  amount: number;
  timestamp: string;
  status: "successful" | "failed" | "pending";
  date: string;
  productName: string;
  customer: string;
  storeLocation: string;
  iieFaculty?: string;
}

// Export activity type with campus location
export type CampusActivity = ActivityItem & { campusLocation?: string };

// Add StoreActivity type
export type StoreActivity = ActivityItem & { storeLocation?: string };
