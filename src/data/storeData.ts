
import { StoreData, RevenueDataPoint } from "./types";

// Store names/locations
export const storeLocations = [
  "All Stores",
  "Johannesburg",
  "Cape Town",
];

// Mock data for different stores
const storeData: Record<string, StoreData> = {
  "All Stores": {
    revenue: [98500, 92000, 85600, 97800, 105200, 112400, 132000, 124500, 119800, 115300, 121000, 128700, 142300, 156000],
    salesCount: 476,
    averageOrder: 2240,
    newCustomers: 138
  },
  "Johannesburg": {
    revenue: [24500, 22000, 18600, 21800, 25200, 27400, 32000, 30500, 29800, 28300, 30000, 31700, 35300, 38000],
    salesCount: 212,
    averageOrder: 2580,
    newCustomers: 132
  },
  "Cape Town": {
    revenue: [26500, 24000, 22600, 25800, 28200, 30400, 34000, 32500, 30800, 29300, 31000, 32700, 36300, 39000],
    salesCount: 324,
    averageOrder: 2760,
    newCustomers: 235
  },
  "Online Store": {
    revenue: [27500, 26000, 25600, 27800, 29200, 30400, 34000, 32500, 31800, 30300, 32000, 33700, 36300, 38000],
    salesCount: 632,
    averageOrder: 2360,
    newCustomers: 442
  }
};

// Get data for a specific store
export const getStoreData = (store: string = "All Stores"): StoreData => {
  return storeData[store as keyof typeof storeData] || storeData["All Stores"];
};

// Generate revenue data for charts
export const getRevenueData = (store: string = "All Stores"): RevenueDataPoint[] => {
  const dates = [
    "2025-03-01", "2025-03-02", "2025-03-03", "2025-03-04", "2025-03-05", "2025-03-06", "2025-03-07",
    "2025-03-08", "2025-03-09", "2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14"
  ];

  const storeRevenue = storeData[store as keyof typeof storeData]?.revenue || storeData["All Stores"].revenue;

  return dates.map((date, index) => ({
    date,
    revenue: storeRevenue[index]
  }));
};

// Default revenue data for initial display
export const revenueData = getRevenueData();
