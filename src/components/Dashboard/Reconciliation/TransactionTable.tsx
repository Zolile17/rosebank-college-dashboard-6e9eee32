
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
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Student Reference</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Campus</TableHead>
          <TableHead>Payer First Name</TableHead>
          <TableHead>Payer Last Name</TableHead>
          <TableHead>Payment Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onViewDetails(transaction)}>
            <TableCell className="font-medium">
              {transaction.id}
            </TableCell>
            <TableCell>{transaction.studentReference}</TableCell>
            <TableCell>{transaction.firstName}</TableCell>
            <TableCell>{transaction.lastName}</TableCell>
            <TableCell>{transaction.email}</TableCell>
            <TableCell>{transaction.campus}</TableCell>
            <TableCell>{transaction.payerFirstName}</TableCell>
            <TableCell>{transaction.payerLastName}</TableCell>
            <TableCell>{transaction.paymentType}</TableCell>
            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
            <TableCell>{transaction.timestamp}</TableCell>
            <TableCell>
              <TransactionStatusBadge status={transaction.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
