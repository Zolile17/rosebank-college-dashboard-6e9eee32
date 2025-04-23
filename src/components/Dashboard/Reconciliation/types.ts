
export interface Transaction {
  id: string;
  studentReference: string;
  firstName: string;
  lastName: string;
  email: string;
  campus: string;
  payerFirstName: string;
  paymentType: string;
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
