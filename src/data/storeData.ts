import { CampusData, RevenueDataPoint } from "./types";

// Campus names/locations
export const campusLocations = [
  "All Campuses",
  "Braamfontein",
  "Pretoria",
  "Durban",
  "Polokwane",
  "Cape Town",
];

// Mock data for different campuses
const campusData: Record<string, CampusData> = {
  "All Campuses": {
    revenue: [98500, 92000, 85600, 97800, 105200, 112400, 132000, 124500, 119800, 115300, 121000, 128700, 142300, 156000],
    paymentsCount: 23060,
    averagePayment: 2240,
    transactionsCount: 1380,
    salesCount: 476,
    averageOrder: 2240,
    newCustomers: 138
  },
  "Braamfontein": {
    revenue: [24500, 22000, 18600, 21800, 25200, 27400, 32000, 30500, 29800, 28300, 30000, 31700, 35300, 38000],
    paymentsCount: 2120,
    averagePayment: 2580,
    transactionsCount: 1320,
    salesCount: 212,
    averageOrder: 2580,
    newCustomers: 54
  },
  "Cape Town": {
    revenue: [26500, 24000, 22600, 25800, 28200, 30400, 34000, 32500, 30800, 29300, 31000, 32700, 36300, 39000],
    paymentsCount: 3240,
    averagePayment: 2760,
    transactionsCount: 2350,
    salesCount: 324,
    averageOrder: 2760,
    newCustomers: 72
  },
  "Durban": {
    revenue: [27500, 26000, 25600, 27800, 29200, 30400, 34000, 32500, 31800, 30300, 32000, 33700, 36300, 38000],
    paymentsCount: 632,
    averagePayment: 2360,
    transactionsCount: 442,
    salesCount: 632,
    averageOrder: 2360,
    newCustomers: 128
  },
  "Pretoria": {
    revenue: [22500, 20000, 21600, 23800, 24200, 25400, 28000, 27500, 26800, 25300, 27000, 28700, 30300, 32000],
    paymentsCount: 532,
    averagePayment: 2460,
    transactionsCount: 3420,
    salesCount: 532,
    averageOrder: 2460,
    newCustomers: 98
  },
  "Polokwane": {
    revenue: [18500, 17000, 16600, 18800, 19200, 20400, 22000, 21500, 20800, 19300, 21000, 22700, 24300, 26000],
    paymentsCount: 432,
    averagePayment: 1960,
    transactionsCount: 242,
    salesCount: 432,
    averageOrder: 1960,
    newCustomers: 86
  }
};

// Get data for a specific campus
export const getCampusData = (campus: string = "All Campuses"): CampusData => {
  return campusData[campus as keyof typeof campusData] || campusData["All Campuses"];
};

// Generate revenue data for charts
export const getRevenueData = (campus: string = "All Campuses"): RevenueDataPoint[] => {
  const dates = [
    "2025-03-01", "2025-03-02", "2025-03-03", "2025-03-04", "2025-03-05", "2025-03-06", "2025-03-07",
    "2025-03-08", "2025-03-09", "2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14"
  ];

  const campusRevenue = campusData[campus as keyof typeof campusData]?.revenue || campusData["All Campuses"].revenue;

  return dates.map((date, index) => ({
    date,
    revenue: campusRevenue[index]
  }));
};

// Default revenue data for initial display
export const revenueData = getRevenueData();
