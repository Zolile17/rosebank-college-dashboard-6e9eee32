
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { Transaction } from "./types";

interface TransactionTableProps {
  transactions: Transaction[];
  formatCurrency: (value: number) => string;
  onViewDetails: (transaction: Transaction) => void;
}

export function TransactionTable({ 
  transactions, 
  formatCurrency,
  onViewDetails 
}: TransactionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>TransactionID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>RRN</TableHead>
          <TableHead>TerminalID</TableHead>
          <TableHead>Store</TableHead>
          <TableHead>Served By</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">
              {transaction.id}
            </TableCell>
            <TableCell>{transaction.productName}</TableCell>
            <TableCell>{transaction.customer}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
            <TableCell>
              <TransactionStatusBadge status={transaction.status} />
            </TableCell>
            <TableCell>{transaction.rrn || "N/A"}</TableCell>
            <TableCell>{transaction.terminalId || "N/A"}</TableCell>
            <TableCell>{transaction.store || "N/A"}</TableCell>
            <TableCell>{transaction.servedBy || "N/A"}</TableCell>
            <TableCell>{transaction.email || "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
