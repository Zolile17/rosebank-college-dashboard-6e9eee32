
import { ReconciliationTransaction, TransactionsTableTransaction } from "./types";
import { generateRRN, generateMaskedCard } from "./utils";

// Cashier names for transactions
const cashierNames = [
  "Thabo Mbulazi",
  "Lerato Zulu",
  "Grace Ndlovu",
  "Sipho Mabaso",
  "Nomsa Khumalo",
  "Bongani Dlamini",
  "Ayanda Nkosi",
  "Nelson Mandela Jr.",
  "Precious Mokoena",
  "Themba Mosimane"
];

// Sample transactions with updated data
export const transactionsData: ReconciliationTransaction[] = [
  {
    id: "T1001",
    productName: "Neverfull MM Tote",
    customer: "Emily Parker",
    date: "Apr 7, 2025",
    amount: 16500,
    status: "completed",
    storeLocation: "Cape Town",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[0],
    terminalId: "001",
    store: "Cape Town",
    email: "thabo.parker@example.com"
  },
  {
    id: "T1002",
    productName: "Speedy 30 Handbag",
    customer: "Sarah Johnson",
    date: "Apr 7, 2025",
    amount: 13506,
    status: "refund",
    storeLocation: "Johannesburg",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[1],
    terminalId: "002",
    store: "Johannesburg",
    email: "lerato.johnson@example.com"
  },
  {
    id: "T1003",
    productName: "Monogram Shawl",
    customer: "Thomas Wright",
    date: "Apr 6, 2025",
    amount: 4905,
    status: "pending",
    storeLocation: "Johannesburg",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[2],
    terminalId: "003",
    store: "Johannesburg",
    email: "grace.wright@example.com"
  },
  {
    id: "T1004",
    productName: "Horizon 55 Luggage",
    customer: "David Chen",
    date: "Apr 6, 2025",
    amount: 2800,
    status: "failed",
    storeLocation: "Cape Town",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[3],
    terminalId: "004",
    store: "Cape Town",
    email: "sipho.chen@example.com"
  },
  {
    id: "T1005",
    productName: "Tambour Watch",
    customer: "Julia Roberts",
    date: "Apr 5, 2025",
    amount: 4950,
    status: "refund",
    storeLocation: "Online Store",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[4],
    terminalId: "005",
    store: "Online Store",
    email: "nomsa.roberts@example.com"
  },
  {
    id: "T1006",
    productName: "Capucines MM Bag",
    customer: "Alexandra Smith",
    date: "Apr 5, 2025",
    amount: 46500,
    status: "completed",
    storeLocation: "Cape Town",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[5],
    terminalId: "006",
    store: "Cape Town",
    email: "bongani.smith@example.com"
  },
  {
    id: "T1007",
    productName: "LV Archlight Sneakers",
    customer: "Michael Brown",
    date: "Apr 4, 2025",
    amount: 10900,
    status: "refund",
    storeLocation: "Johannesburg",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[6],
    terminalId: "007",
    store: "Johannesburg",
    email: "ayanda.brown@example.com"
  },
  {
    id: "T1008",
    productName: "Twist Chain Wallet",
    customer: "Sophia Garcia",
    date: "Apr 4, 2025",
    amount: 1850,
    status: "pending",
    storeLocation: "Cape Town",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[7],
    terminalId: "008",
    store: "Cape Town",
    email: "nelson.garcia@example.com"
  },
  {
    id: "T1009",
    productName: "Petit Palais Clutch",
    customer: "Naomi Campbell",
    date: "Apr 3, 2025",
    amount: 2150,
    status: "completed",
    storeLocation: "Cape Town",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[8],
    terminalId: "009",
    store: "Cape Town",
    email: "precious.campbell@example.com"
  },
  {
    id: "T1010",
    productName: "Monogram Belt",
    customer: "James Wilson",
    date: "Apr 3, 2025",
    amount: 5250,
    status: "failed",
    storeLocation: "Johannesburg",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[9],
    terminalId: "010",
    store: "Johannesburg",
    email: "themba.wilson@example.com"
  },
  {
    id: "T1011",
    productName: "Alma BB Handbag",
    customer: "Olivia Chen",
    date: "Apr 2, 2025",
    amount: 1590,
    status: "refund",
    storeLocation: "Cape Town",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[0],
    terminalId: "011",
    store: "Cape Town",
    email: "thabo.chen@example.com"
  },
  {
    id: "T1012",
    productName: "Dauphine Wallet",
    customer: "Emma Watson",
    date: "Apr 2, 2025",
    amount: 750,
    status: "completed",
    storeLocation: "Johannesburg",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard(),
    servedBy: cashierNames[1],
    terminalId: "012",
    store: "Johannesburg",
    email: "lerato.watson@example.com"
  }
];

// Filter transactions by store
export const getTransactionsByStore = (store: string = "All Stores"): TransactionsTableTransaction[] => {
  if (store === "All Stores") {
    return transactionsData as TransactionsTableTransaction[];
  }
  return (transactionsData.filter(transaction => transaction.storeLocation === store)) as TransactionsTableTransaction[];
};
