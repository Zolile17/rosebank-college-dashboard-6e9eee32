
export interface Transaction {
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
  status: string;
  rrn?: string;
  cardNumber?: string;
  iieFaculty?: string;
}

export interface ReconciliationTableProps {
  transactions: Transaction[];
  formatCurrency: (value: number) => string;
}
