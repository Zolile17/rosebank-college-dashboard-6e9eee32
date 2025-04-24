
import { ReconciliationTransaction, TransactionsTableTransaction } from "./types";
import { generateRRN, generateMaskedCard } from "./utils";

// Add faculties
const faculties = [
  "Commerce",
  "Finance & Accounting",
  "Law",
  "Education",
  "Humanities and Social Science",
  "Information and Communications Technology"
];

// Helper function to randomly assign a faculty
const assignRandomFaculty = () => faculties[Math.floor(Math.random() * faculties.length)];

// Helper function to hash student reference
const hashStudentRef = (id: string): string => {
  return `SC${id.substring(0, 8)}`;
};

// Helper function to generate student ID
const generateStudentId = (): string => {
  return `${Math.floor(9000000000000 + Math.random() * 1000000000000)}`;
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

// Sample product names for transactions
const productNames = [
  "Registration Fee",
  "Tuition Fee",
  "Exam Fee",
  "Application Fee",
  "Student Card Replacement",
  "Library Fine",
  "Accommodation Fee",
  "Course Materials",
  "Technology Fee",
  "Graduation Fee"
];

// Generate customer names
const getCustomerName = (firstName: string, lastName: string): string => {
  return `${firstName.replace("***", "")} ${lastName.replace("***", "")}`;
};

// Sample student data with updated fields for campus payments
// Add iieFaculty for each transaction (random assignment)
// Make sure all transactions have studentId
export const transactionsData: ReconciliationTransaction[] = [
  {
    id: "T1001",
    studentId: "9812345678901",
    studentReference: hashStudentRef("12345678"),
    firstName: "Em***",
    lastName: "Pa***",
    email: maskEmail("emily.parker@example.com"),
    timestamp: "Apr 7, 2025, 09:15 AM",
    amount: 16500,
    status: "successful",
    campus: "Cape Town",
    payerFirstName: "Thomas",
    iieFaculty: assignRandomFaculty(),
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1002",
    studentId: "9823456789012",
    studentReference: hashStudentRef("23456789"),
    firstName: "Sa***",
    lastName: "Jo***",
    email: maskEmail("sarah.johnson@example.com"),
    timestamp: "Apr 7, 2025, 10:30 AM",
    amount: 13506,
    status: "failed",
    campus: "Braamfontein",
    payerFirstName: "Robert",
    iieFaculty: assignRandomFaculty(),
    paymentType: "EFT",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1003",
    studentId: "9834567890123",
    studentReference: hashStudentRef("34567890"),
    firstName: "Th***",
    lastName: "Wr***",
    email: maskEmail("thomas.wright@example.com"),
    timestamp: "Apr 6, 2025, 14:22 PM",
    amount: 4905,
    status: "pending",
    campus: "Braamfontein",
    payerFirstName: "Thomas",
    iieFaculty: assignRandomFaculty(),
    paymentType: "Instant",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1004",
    studentId: "9845678901234",
    studentReference: hashStudentRef("45678901"),
    firstName: "Da***",
    lastName: "Ch***",
    email: maskEmail("david.chen@example.com"),
    timestamp: "Apr 6, 2025, 15:45 PM",
    amount: 2800,
    status: "failed",
    campus: "Cape Town",
    payerFirstName: "Ming",
    iieFaculty: assignRandomFaculty(),
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1005",
    studentId: "9856789012345",
    studentReference: hashStudentRef("56789012"),
    firstName: "Ju***",
    lastName: "Ro***",
    email: maskEmail("julia.roberts@example.com"),
    timestamp: "Apr 5, 2025, 08:10 AM",
    amount: 4950,
    status: "failed",
    campus: "Durban",
    payerFirstName: "Eric",
    iieFaculty: assignRandomFaculty(),
    paymentType: "EFT",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1006",
    studentId: "9867890123456",
    studentReference: hashStudentRef("67890123"),
    firstName: "Al***",
    lastName: "Sm***",
    email: maskEmail("alexandra.smith@example.com"),
    timestamp: "Apr 5, 2025, 09:30 AM",
    amount: 46500,
    status: "successful",
    campus: "Cape Town",
    payerFirstName: "Alexandra",
    iieFaculty: assignRandomFaculty(),
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1007",
    studentId: "9878901234567",
    studentReference: hashStudentRef("78901234"),
    firstName: "Mi***",
    lastName: "Br***",
    email: maskEmail("michael.brown@example.com"),
    timestamp: "Apr 4, 2025, 11:20 AM",
    amount: 10900,
    status: "failed",
    campus: "Braamfontein",
    payerFirstName: "Jackson",
    iieFaculty: assignRandomFaculty(),
    paymentType: "Instant",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1008",
    studentId: "9889012345678",
    studentReference: hashStudentRef("89012345"),
    firstName: "So***",
    lastName: "Ga***",
    email: maskEmail("sophia.garcia@example.com"),
    timestamp: "Apr 4, 2025, 12:15 PM",
    amount: 1850,
    status: "pending",
    campus: "Cape Town",
    payerFirstName: "Carlos",
    iieFaculty: assignRandomFaculty(),
    paymentType: "EFT",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1009",
    studentId: "9890123456789",
    studentReference: hashStudentRef("90123456"),
    firstName: "Na***",
    lastName: "Ca***",
    email: maskEmail("naomi.campbell@example.com"),
    timestamp: "Apr 3, 2025, 13:45 PM",
    amount: 2150,
    status: "successful",
    campus: "Pretoria",
    payerFirstName: "Naomi",
    iieFaculty: assignRandomFaculty(),
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1010",
    studentId: "9801234567890",
    studentReference: hashStudentRef("01234567"),
    firstName: "Ja***",
    lastName: "Wi***",
    email: maskEmail("james.wilson@example.com"),
    timestamp: "Apr 3, 2025, 14:30 PM",
    amount: 5250,
    status: "failed",
    campus: "Polokwane",
    payerFirstName: "James",
    iieFaculty: assignRandomFaculty(),
    paymentType: "Instant",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1011",
    studentId: "9812345670123",
    studentReference: hashStudentRef("12345670"),
    firstName: "Ol***",
    lastName: "Ch***",
    email: maskEmail("olivia.chen@example.com"),
    timestamp: "Apr 2, 2025, 10:20 AM",
    amount: 1590,
    status: "failed",
    campus: "Durban",
    payerFirstName: "Olivia",
    iieFaculty: assignRandomFaculty(),
    paymentType: "Card",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  },
  {
    id: "T1012",
    studentId: "9823456701234",
    studentReference: hashStudentRef("23456701"),
    firstName: "Em***",
    lastName: "Wa***",
    email: maskEmail("emma.watson@example.com"),
    timestamp: "Apr 2, 2025, 11:15 AM",
    amount: 750,
    status: "successful",
    campus: "Braamfontein",
    payerFirstName: "John",
    iieFaculty: assignRandomFaculty(),
    paymentType: "EFT",
    rrn: generateRRN(),
    cardNumber: generateMaskedCard()
  }
];

// Convert to TransactionsTableTransaction with necessary fields for the UI
const convertToTableTransactions = (data: ReconciliationTransaction[]): TransactionsTableTransaction[] => {
  return data.map(t => {
    const customerName = getCustomerName(t.firstName, t.lastName);
    return {
      ...t,
      studentId: t.studentId || generateStudentId(), // Ensure studentId is always present
      payerLastName: "", // remain for old consumers
      paymentType: t.paymentType || "",
      date: t.timestamp,
      productName: productNames[Math.floor(Math.random() * productNames.length)],
      customer: customerName,
      storeLocation: t.campus,
      iieFaculty: t.iieFaculty
    };
  });
};

// Filter transactions by campus
export const getTransactionsByCampus = (campus: string = "All Campuses"): TransactionsTableTransaction[] => {
  if (campus === "All Campuses") {
    return convertToTableTransactions(transactionsData);
  }
  return convertToTableTransactions(transactionsData.filter(transaction => transaction.campus === campus));
};
