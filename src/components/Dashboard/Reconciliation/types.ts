
export interface Transaction {
  id: string;
  productName: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  storeLocation: string;
  rrn?: string;
  cardNumber?: string;
  servedBy?: string;
  paymentMethod?: string;
  notes?: string;
  terminalId: string;
  store: string;
  email: string;
}

export interface ReconciliationTableProps {
  transactions: Transaction[];
  formatCurrency: (value: number) => string;
}
