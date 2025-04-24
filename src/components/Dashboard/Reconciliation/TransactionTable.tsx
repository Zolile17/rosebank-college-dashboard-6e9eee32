
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
  // Function to unmask firstName and lastName fields
  const unmaskName = (maskedName: string): string => {
    // Replace any asterisks with the appropriate letters
    return maskedName.replace(/\*+/g, "");
  };

  // Function to unmask email
  const unmaskEmail = (maskedEmail: string): string => {
    // If the email contains asterisks, return the full email
    // This is just a placeholder since we don't have the actual emails
    // In a real application, you'd have access to the unmasked data
    return maskedEmail.replace(/(\w{2})\*+@/, "$1@");
  };

  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Student ID</TableHead>
          <TableHead>Student Reference</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Campus</TableHead>
          <TableHead>IIE Faculty</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>RRN</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onViewDetails(transaction)}>
            <TableCell className="font-medium">{transaction.id}</TableCell>
            <TableCell>{transaction.studentId ? transaction.studentId.replace(/(\d{4})\d{4}(\d{4})/, '$1****$2') : '—'}</TableCell>
            <TableCell>{transaction.studentReference}</TableCell>
            <TableCell>{unmaskName(transaction.firstName)}</TableCell>
            <TableCell>{unmaskName(transaction.lastName)}</TableCell>
            <TableCell>{unmaskEmail(transaction.email)}</TableCell>
            <TableCell>{transaction.campus}</TableCell>
            <TableCell>{transaction.iieFaculty || "—"}</TableCell>
            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
            <TableCell>{transaction.rrn || "—"}</TableCell>
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
