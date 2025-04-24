import { transactionsData } from "./transactionData";
import {
  CampusData,
  RevenueDataPoint,
  CampusActivity,
  StoreActivity,
  TransactionsTableTransaction,
  ActivityItem
} from "./types";
import { campusLocations } from "./storeData";

// Export storeLocations for use in other components
export { campusLocations } from "./storeData";

// Export transactions data for report generation
export { transactionsData } from "./transactionData";

// Mock data for campus performance
const campusData: { [key: string]: CampusData } = {
  "All Stores": {
    revenue: 550000,
    paymentsCount: 2345,
    averagePayment: 230,
    transactionsCount: 4567,
    salesCount: 1234,
    averageOrder: 345,
    newCustomers: 678,
  },
  "Cape Town": {
    revenue: 170000,
    paymentsCount: 600,
    averagePayment: 250,
    transactionsCount: 1500,
    salesCount: 300,
    averageOrder: 400,
    newCustomers: 200,
  },
  Braamfontein: {
    revenue: 120000,
    paymentsCount: 500,
    averagePayment: 270,
    transactionsCount: 1200,
    salesCount: 250,
    averageOrder: 420,
    newCustomers: 180,
  },
  Durban: {
    revenue: 95000,
    paymentsCount: 450,
    averagePayment: 240,
    transactionsCount: 1100,
    salesCount: 220,
    averageOrder: 380,
    newCustomers: 160,
  },
  Pretoria: {
    revenue: 85000,
    paymentsCount: 400,
    averagePayment: 260,
    transactionsCount: 1000,
    salesCount: 200,
    averageOrder: 410,
    newCustomers: 150,
  },
  Polokwane: {
    revenue: 75000,
    paymentsCount: 350,
    averagePayment: 280,
    transactionsCount: 900,
    salesCount: 180,
    averageOrder: 430,
    newCustomers: 140,
  },
};

// Update revenue data format
const revenueData: { [key: string]: RevenueDataPoint[] } = {
  "All Stores": [
    { date: "2025-03-01", revenue: 280000 },
    { date: "2025-03-02", revenue: 320000 },
    { date: "2025-03-03", revenue: 290000 },
    { date: "2025-03-04", revenue: 350000 },
    { date: "2025-03-05", revenue: 380000 },
    { date: "2025-03-06", revenue: 420000 },
    { date: "2025-03-07", revenue: 400000 },
    { date: "2025-03-08", revenue: 450000 },
    { date: "2025-03-09", revenue: 480000 },
    { date: "2025-03-10", revenue: 500000 },
    { date: "2025-03-11", revenue: 520000 },
    { date: "2025-03-12", revenue: 550000 },
  ],
  "Cape Town": [
    { date: "2025-03-01", revenue: 80000 },
    { date: "2025-03-02", revenue: 90000 },
    { date: "2025-03-03", revenue: 75000 },
    { date: "2025-03-04", revenue: 100000 },
    { date: "2025-03-05", revenue: 110000 },
    { date: "2025-03-06", revenue: 120000 },
    { date: "2025-03-07", revenue: 115000 },
    { date: "2025-03-08", revenue: 130000 },
    { date: "2025-03-09", revenue: 140000 },
    { date: "2025-03-10", revenue: 150000 },
    { date: "2025-03-11", revenue: 160000 },
    { date: "2025-03-12", revenue: 170000 },
  ],
  Braamfontein: [
    { date: "2025-03-01", revenue: 60000 },
    { date: "2025-03-02", revenue: 70000 },
    { date: "2025-03-03", revenue: 65000 },
    { date: "2025-03-04", revenue: 80000 },
    { date: "2025-03-05", revenue: 85000 },
    { date: "2025-03-06", revenue: 90000 },
    { date: "2025-03-07", revenue: 88000 },
    { date: "2025-03-08", revenue: 95000 },
    { date: "2025-03-09", revenue: 100000 },
    { date: "2025-03-10", revenue: 110000 },
    { date: "2025-03-11", revenue: 115000 },
    { date: "2025-03-12", revenue: 120000 },
  ],
  Durban: [
    { date: "2025-03-01", revenue: 50000 },
    { date: "2025-03-02", revenue: 55000 },
    { date: "2025-03-03", revenue: 52000 },
    { date: "2025-03-04", revenue: 60000 },
    { date: "2025-03-05", revenue: 65000 },
    { date: "2025-03-06", revenue: 70000 },
    { date: "2025-03-07", revenue: 68000 },
    { date: "2025-03-08", revenue: 75000 },
    { date: "2025-03-09", revenue: 80000 },
    { date: "2025-03-10", revenue: 85000 },
    { date: "2025-03-11", revenue: 90000 },
    { date: "2025-03-12", revenue: 95000 },
  ],
  Pretoria: [
    { date: "2025-03-01", revenue: 40000 },
    { date: "2025-03-02", revenue: 45000 },
    { date: "2025-03-03", revenue: 42000 },
    { date: "2025-03-04", revenue: 50000 },
    { date: "2025-03-05", revenue: 55000 },
    { date: "2025-03-06", revenue: 60000 },
    { date: "2025-03-07", revenue: 58000 },
    { date: "2025-03-08", revenue: 65000 },
    { date: "2025-03-09", revenue: 70000 },
    { date: "2025-03-10", revenue: 75000 },
    { date: "2025-03-11", revenue: 80000 },
    { date: "2025-03-12", revenue: 85000 },
  ],
  Polokwane: [
    { date: "2025-03-01", revenue: 30000 },
    { date: "2025-03-02", revenue: 35000 },
    { date: "2025-03-03", revenue: 32000 },
    { date: "2025-03-04", revenue: 40000 },
    { date: "2025-03-05", revenue: 45000 },
    { date: "2025-03-06", revenue: 50000 },
    { date: "2025-03-07", revenue: 48000 },
    { date: "2025-03-08", revenue: 55000 },
    { date: "2025-03-09", revenue: 60000 },
    { date: "2025-03-10", revenue: 65000 },
    { date: "2025-03-11", revenue: 70000 },
    { date: "2025-03-12", revenue: 75000 },
  ],
};

// Mock data for activities - all have required title field
const activities: (CampusActivity | StoreActivity)[] = [
  {
    id: "A1001",
    timestamp: "Apr 7, 2024, 09:15 AM",
    description: "New order placed",
    campusLocation: "Cape Town",
    title: "Order Placed",
  },
  {
    id: "A1002",
    timestamp: "Apr 7, 2024, 10:30 AM",
    description: "Payment processed",
    campusLocation: "Braamfontein",
    title: "Payment",
  },
  {
    id: "A1003",
    timestamp: "Apr 6, 2024, 14:22 PM",
    description: "Shipment dispatched",
    storeLocation: "Durban",
    title: "Shipment",
  },
  {
    id: "A1004",
    timestamp: "Apr 6, 2024, 15:45 PM",
    description: "Customer inquiry received",
    storeLocation: "Pretoria",
    title: "Customer Service",
  },
  {
    id: "A1005",
    timestamp: "Apr 5, 2024, 08:10 AM",
    description: "Low stock alert",
    storeLocation: "Polokwane",
    title: "Inventory Alert",
  },
  {
    id: "A1006",
    timestamp: "Apr 5, 2024, 09:30 AM",
    description: "New product added",
    campusLocation: "Cape Town",
    title: "Product Update",
  },
  {
    id: "A1007",
    timestamp: "Apr 4, 2024, 11:20 AM",
    description: "Supplier order placed",
    campusLocation: "Braamfontein",
    title: "Supplier Order",
  },
  {
    id: "A1008",
    timestamp: "Apr 4, 2024, 12:15 PM",
    description: "Marketing campaign launched",
    storeLocation: "Durban",
    title: "Marketing",
  },
  {
    id: "A1009",
    timestamp: "Apr 3, 2024, 13:45 PM",
    description: "Employee training scheduled",
    storeLocation: "Pretoria",
    title: "Training",
  },
  {
    id: "A1010",
    timestamp: "Apr 3, 2024, 14:30 PM",
    description: "System maintenance completed",
    storeLocation: "Polokwane",
    title: "Maintenance",
  },
];

// Export activities data for reports
export const activitiesData = activities;

// Function to get store data by campus
export const getStoreData = (store: string): CampusData => {
  return campusData[store] || campusData["All Stores"];
};

// Function to get revenue data by campus
export const getRevenueData = (store: string): RevenueDataPoint[] => {
  return revenueData[store] || revenueData["All Stores"];
};

// Function to get activities by store
export const getActivitiesByStore = (
  store: string
): ActivityItem[] => {
  if (store === "All Stores") {
    return activities;
  }
  return activities.filter(
    (activity) =>
      "storeLocation" in activity && activity.storeLocation === store ||
      "campusLocation" in activity && activity.campusLocation === store
  );
};

// Re-export the getTransactionsByCampus function with the new name getTransactionsByStore
export { getTransactionsByCampus as getTransactionsByStore } from './transactionData';
