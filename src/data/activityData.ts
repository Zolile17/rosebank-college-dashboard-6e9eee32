
import { StoreActivity } from "./types";

// Filter activities by store
export const getActivitiesByStore = (store: string = "All Stores") => {
  if (store === "All Stores") {
    return activitiesData;
  }

  return activitiesData.filter(activity => {
    return activity.description.includes(store) || 
           (activity.storeLocation && activity.storeLocation === store);
  });
};

// Recent activities data with store location
export const activitiesData: StoreActivity[] = [
  {
    id: "A1011",
    title: "New Store Opening",
    description: "Grand opening of our new flagship store in Sandton City, Johannesburg.",
    timestamp: "Just now",
    type: "campaign",
    storeLocation: "Johannesburg"
  },
  {
    id: "A1001",
    title: "Limited Edition Collection Launch",
    description: "The Spring/Summer collection is now available in all flagship stores.",
    timestamp: "2 hours ago",
    type: "campaign"
  },
  {
    id: "A1002",
    title: "High-value Sale",
    description: "Sophia Williams purchased Petite Malle handbag for €7,900 in Cape Town.",
    timestamp: "4 hours ago",
    type: "sale",
    storeLocation: "Cape Town"
  },
  {
    id: "A1003",
    title: "Inventory Alert",
    description: "Pochette Metis is low on stock in Johannesburg store.",
    timestamp: "6 hours ago",
    type: "alert",
    storeLocation: "Johannesburg"
  },
  {
    id: "A1004",
    title: "Customer Refund",
    description: "Processed refund of €1,290 for Emma Thompson.",
    timestamp: "8 hours ago",
    type: "refund",
    storeLocation: "Johannesburg"
  },
  {
    id: "A1005",
    title: "New Stock Arrival",
    description: "Spring/Summer ready-to-wear collection arrived at Johannesburg flagship.",
    timestamp: "12 hours ago",
    type: "restock",
    storeLocation: "Johannesburg"
  },
  {
    id: "A1006",
    title: "VIP Client Purchase",
    description: "Private client purchased limited edition trunks worth €45,000.",
    timestamp: "1 day ago",
    type: "sale",
    storeLocation: "Johannesburg"
  },
  {
    id: "A1007",
    title: "Staff Training Completed",
    description: "New product training completed for all sales associates in Cape Town store.",
    timestamp: "1 day ago",
    type: "staff",
    storeLocation: "Cape Town"
  },
  {
    id: "A1008",
    title: "Online Sale Peak",
    description: "Record-breaking single hour sales of €125,000 achieved on our e-commerce platform.",
    timestamp: "2 days ago",
    type: "sale",
    storeLocation: "Online Store"
  },
  {
    id: "A1009",
    title: "Maintenance Scheduled",
    description: "Cape Town store will undergo maintenance on April 12th, operating with limited capacity.",
    timestamp: "2 days ago",
    type: "alert",
    storeLocation: "Cape Town"
  },
  {
    id: "A1010",
    title: "New Regional Manager",
    description: "Sarah Chen appointed as the new regional manager for Asia Pacific region.",
    timestamp: "3 days ago",
    type: "staff"
  }
];
