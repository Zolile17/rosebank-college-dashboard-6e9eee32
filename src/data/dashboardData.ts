
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
    revenue: [
      280000, 320000, 290000, 350000, 380000, 420000, 400000, 450000, 480000,
      500000, 520000, 550000,
    ],
    paymentsCount: 2345,
    averagePayment: 230,
    transactionsCount: 4567,
    salesCount: 1234,
    averageOrder: 345,
    newCustomers: 678,
  },
  "Cape Town": {
    revenue: [
      80000, 90000, 75000, 100000, 110000, 120000, 115000, 130000, 140000,
      150000, 160000, 170000,
    ],
    paymentsCount: 600,
    averagePayment: 250,
    transactionsCount: 1500,
    salesCount: 300,
    averageOrder: 400,
    newCustomers: 200,
  },
  Braamfontein: {
    revenue: [
      60000, 70000, 65000, 80000, 85000, 90000, 88000, 95000, 100000, 110000,
      115000, 120000,
    ],
    paymentsCount: 500,
    averagePayment: 270,
    transactionsCount: 1200,
    salesCount: 250,
    averageOrder: 420,
    newCustomers: 180,
  },
  Durban: {
    revenue: [
      50000, 55000, 52000, 60000, 65000, 70000, 68000, 75000, 80000, 85000,
      90000, 95000,
    ],
    paymentsCount: 450,
    averagePayment: 240,
    transactionsCount: 1100,
    salesCount: 220,
    averageOrder: 380,
    newCustomers: 160,
  },
  Pretoria: {
    revenue: [
      40000, 45000, 42000, 50000, 55000, 60000, 58000, 65000, 70000, 75000,
      80000, 85000,
    ],
    paymentsCount: 400,
    averagePayment: 260,
    transactionsCount: 1000,
    salesCount: 200,
    averageOrder: 410,
    newCustomers: 150,
  },
  Polokwane: {
    revenue: [
      30000, 35000, 32000, 40000, 45000, 50000, 48000, 55000, 60000, 65000,
      70000, 75000,
    ],
    paymentsCount: 350,
    averagePayment: 280,
    transactionsCount: 900,
    salesCount: 180,
    averageOrder: 430,
    newCustomers: 140,
  },
};

// Mock data for revenue
const revenueData: { [key: string]: RevenueDataPoint[] } = {
  "All Stores": [
    { date: "Jan", revenue: 280000 },
    { date: "Feb", revenue: 320000 },
    { date: "Mar", revenue: 290000 },
    { date: "Apr", revenue: 350000 },
    { date: "May", revenue: 380000 },
    { date: "Jun", revenue: 420000 },
    { date: "Jul", revenue: 400000 },
    { date: "Aug", revenue: 450000 },
    { date: "Sep", revenue: 480000 },
    { date: "Oct", revenue: 500000 },
    { date: "Nov", revenue: 520000 },
    { date: "Dec", revenue: 550000 },
  ],
  "Cape Town": [
    { date: "Jan", revenue: 80000 },
    { date: "Feb", revenue: 90000 },
    { date: "Mar", revenue: 75000 },
    { date: "Apr", revenue: 100000 },
    { date: "May", revenue: 110000 },
    { date: "Jun", revenue: 120000 },
    { date: "Jul", revenue: 115000 },
    { date: "Aug", revenue: 130000 },
    { date: "Sep", revenue: 140000 },
    { date: "Oct", revenue: 150000 },
    { date: "Nov", revenue: 160000 },
    { date: "Dec", revenue: 170000 },
  ],
  Braamfontein: [
    { date: "Jan", revenue: 60000 },
    { date: "Feb", revenue: 70000 },
    { date: "Mar", revenue: 65000 },
    { date: "Apr", revenue: 80000 },
    { date: "May", revenue: 85000 },
    { date: "Jun", revenue: 90000 },
    { date: "Jul", revenue: 88000 },
    { date: "Aug", revenue: 95000 },
    { date: "Sep", revenue: 100000 },
    { date: "Oct", revenue: 110000 },
    { date: "Nov", revenue: 115000 },
    { date: "Dec", revenue: 120000 },
  ],
  Durban: [
    { date: "Jan", revenue: 50000 },
    { date: "Feb", revenue: 55000 },
    { date: "Mar", revenue: 52000 },
    { date: "Apr", revenue: 60000 },
    { date: "May", revenue: 65000 },
    { date: "Jun", revenue: 70000 },
    { date: "Jul", revenue: 68000 },
    { date: "Aug", revenue: 75000 },
    { date: "Sep", revenue: 80000 },
    { date: "Oct", revenue: 85000 },
    { date: "Nov", revenue: 90000 },
    { date: "Dec", revenue: 95000 },
  ],
  Pretoria: [
    { date: "Jan", revenue: 40000 },
    { date: "Feb", revenue: 45000 },
    { date: "Mar", revenue: 42000 },
    { date: "Apr", revenue: 50000 },
    { date: "May", revenue: 55000 },
    { date: "Jun", revenue: 60000 },
    { date: "Jul", revenue: 58000 },
    { date: "Aug", revenue: 65000 },
    { date: "Sep", revenue: 70000 },
    { date: "Oct", revenue: 75000 },
    { date: "Nov", revenue: 80000 },
    { date: "Dec", revenue: 85000 },
  ],
  Polokwane: [
    { date: "Jan", revenue: 30000 },
    { date: "Feb", revenue: 35000 },
    { date: "Mar", revenue: 32000 },
    { date: "Apr", revenue: 40000 },
    { date: "May", revenue: 45000 },
    { date: "Jun", revenue: 50000 },
    { date: "Jul", revenue: 48000 },
    { date: "Aug", revenue: 55000 },
    { date: "Sep", revenue: 60000 },
    { date: "Oct", revenue: 65000 },
    { date: "Nov", revenue: 70000 },
    { date: "Dec", revenue: 75000 },
  ],
};

// Mock data for activities
const activities: (CampusActivity | StoreActivity)[] = [
  {
    id: "A1001",
    timestamp: "Apr 7, 2024, 09:15 AM",
    description: "New order placed",
    campusLocation: "Cape Town",
  },
  {
    id: "A1002",
    timestamp: "Apr 7, 2024, 10:30 AM",
    description: "Payment processed",
    campusLocation: "Braamfontein",
  },
  {
    id: "A1003",
    timestamp: "Apr 6, 2024, 14:22 PM",
    description: "Shipment dispatched",
    storeLocation: "Durban",
  },
  {
    id: "A1004",
    timestamp: "Apr 6, 2024, 15:45 PM",
    description: "Customer inquiry received",
    storeLocation: "Pretoria",
  },
  {
    id: "A1005",
    timestamp: "Apr 5, 2024, 08:10 AM",
    description: "Low stock alert",
    storeLocation: "Polokwane",
  },
  {
    id: "A1006",
    timestamp: "Apr 5, 2024, 09:30 AM",
    description: "New product added",
    campusLocation: "Cape Town",
  },
  {
    id: "A1007",
    timestamp: "Apr 4, 2024, 11:20 AM",
    description: "Supplier order placed",
    campusLocation: "Braamfontein",
  },
  {
    id: "A1008",
    timestamp: "Apr 4, 2024, 12:15 PM",
    description: "Marketing campaign launched",
    storeLocation: "Durban",
  },
  {
    id: "A1009",
    timestamp: "Apr 3, 2024, 13:45 PM",
    description: "Employee training scheduled",
    storeLocation: "Pretoria",
  },
  {
    id: "A1010",
    timestamp: "Apr 3, 2024, 14:30 PM",
    description: "System maintenance completed",
    storeLocation: "Polokwane",
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
): (CampusActivity | StoreActivity)[] => {
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
