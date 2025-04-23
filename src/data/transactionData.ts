
import { ReconciliationTransaction, TransactionsTableTransaction } from "./types";
import { generateRRN, generateMaskedCard } from "./utils";

// Helper function to hash student reference
const hashStudentRef = (id: string): string => {
  return `SC${id.substring(0, 8)}`;
};

// Helper function to mask email
const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@');
  return `${username.substring(0, 2)}***@${domain}`;
};

// Staff names for payments
const staffNames = [
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

// Sample student data with updated fields for campus payments
export const transactionsData: ReconciliationTransaction[] = [
  {
    id: "T1001",
    studentReference: hashStudentRef("12345678"),
    firstName: "Em***",
    lastName: "Pa***",
    email: maskEmail("emily.parker@example.com"),
    timestamp: "Apr 7, 2025, 09:15 AM",
    amount: 16500,
    status: "successful",
    campus: "Cape Town",
    payerFirstName: "Thomas",
    payerLastName: "Parker",
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1002",
    studentReference: hashStudentRef("23456789"),
    firstName: "Sa***",
    lastName: "Jo***",
    email: maskEmail("sarah.johnson@example.com"),
    timestamp: "Apr 7, 2025, 10:30 AM",
    amount: 13506,
    status: "failed",
    campus: "Braamfontein",
    payerFirstName: "Robert",
    payerLastName: "Johnson",
    paymentType: "EFT",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1003",
    studentReference: hashStudentRef("34567890"),
    firstName: "Th***",
    lastName: "Wr***",
    email: maskEmail("thomas.wright@example.com"),
    timestamp: "Apr 6, 2025, 14:22 PM",
    amount: 4905,
    status: "pending",
    campus: "Braamfontein",
    payerFirstName: "Thomas",
    payerLastName: "Wright",
    paymentType: "Ozow",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1004",
    studentReference: hashStudentRef("45678901"),
    firstName: "Da***",
    lastName: "Ch***",
    email: maskEmail("david.chen@example.com"),
    timestamp: "Apr 6, 2025, 15:45 PM",
    amount: 2800,
    status: "failed",
    campus: "Cape Town",
    payerFirstName: "Ming",
    payerLastName: "Chen",
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1005",
    studentReference: hashStudentRef("56789012"),
    firstName: "Ju***",
    lastName: "Ro***",
    email: maskEmail("julia.roberts@example.com"),
    timestamp: "Apr 5, 2025, 08:10 AM",
    amount: 4950,
    status: "failed",
    campus: "Durban",
    payerFirstName: "Eric",
    payerLastName: "Roberts",
    paymentType: "EFT",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1006",
    studentReference: hashStudentRef("67890123"),
    firstName: "Al***",
    lastName: "Sm***",
    email: maskEmail("alexandra.smith@example.com"),
    timestamp: "Apr 5, 2025, 09:30 AM",
    amount: 46500,
    status: "successful",
    campus: "Cape Town",
    payerFirstName: "Alexandra",
    payerLastName: "Smith",
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1007",
    studentReference: hashStudentRef("78901234"),
    firstName: "Mi***",
    lastName: "Br***",
    email: maskEmail("michael.brown@example.com"),
    timestamp: "Apr 4, 2025, 11:20 AM",
    amount: 10900,
    status: "failed",
    campus: "Braamfontein",
    payerFirstName: "Jackson",
    payerLastName: "Brown",
    paymentType: "Ozow",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1008",
    studentReference: hashStudentRef("89012345"),
    firstName: "So***",
    lastName: "Ga***",
    email: maskEmail("sophia.garcia@example.com"),
    timestamp: "Apr 4, 2025, 12:15 PM",
    amount: 1850,
    status: "pending",
    campus: "Cape Town",
    payerFirstName: "Carlos",
    payerLastName: "Garcia",
    paymentType: "EFT",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1009",
    studentReference: hashStudentRef("90123456"),
    firstName: "Na***",
    lastName: "Ca***",
    email: maskEmail("naomi.campbell@example.com"),
    timestamp: "Apr 3, 2025, 13:45 PM",
    amount: 2150,
    status: "successful",
    campus: "Pretoria",
    payerFirstName: "Naomi",
    payerLastName: "Campbell",
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1010",
    studentReference: hashStudentRef("01234567"),
    firstName: "Ja***",
    lastName: "Wi***",
    email: maskEmail("james.wilson@example.com"),
    timestamp: "Apr 3, 2025, 14:30 PM",
    amount: 5250,
    status: "failed",
    campus: "Polokwane",
    payerFirstName: "James",
    payerLastName: "Wilson",
    paymentType: "Ozow",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1011",
    studentReference: hashStudentRef("12345670"),
    firstName: "Ol***",
    lastName: "Ch***",
    email: maskEmail("olivia.chen@example.com"),
    timestamp: "Apr 2, 2025, 10:20 AM",
    amount: 1590,
    status: "failed",
    campus: "Durban",
    payerFirstName: "Olivia",
    payerLastName: "Chen",
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1012",
    studentReference: hashStudentRef("23456701"),
    firstName: "Em***",
    lastName: "Wa***",
    email: maskEmail("emma.watson@example.com"),
    timestamp: "Apr 2, 2025, 11:15 AM",
    amount: 750,
    status: "successful",
    campus: "Braamfontein",
    payerFirstName: "John",
    payerLastName: "Watson",
    paymentType: "EFT",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  }
];

// Filter transactions by campus
export const getTransactionsByCampus = (campus: string = "All Campuses"): TransactionsTableTransaction[] => {
  if (campus === "All Campuses") {
    return transactionsData as TransactionsTableTransaction[];
  }
  return (transactionsData.filter(transaction => transaction.campus === campus)) as TransactionsTableTransaction[];
};
