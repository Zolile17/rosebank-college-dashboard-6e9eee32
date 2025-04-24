
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { Transaction } from "./types";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter(transaction => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      transaction.id.toLowerCase().includes(searchTerm) ||
      transaction.studentId.toLowerCase().includes(searchTerm) ||
      transaction.studentReference.toLowerCase().includes(searchTerm) ||
      transaction.firstName.toLowerCase().includes(searchTerm) ||
      transaction.lastName.toLowerCase().includes(searchTerm) ||
      transaction.email.toLowerCase().includes(searchTerm) ||
      transaction.campus.toLowerCase().includes(searchTerm) ||
      (transaction.iieFaculty && transaction.iieFaculty.toLowerCase().includes(searchTerm)) ||
      transaction.amount.toString().includes(searchTerm) ||
      (transaction.rrn && transaction.rrn.toLowerCase().includes(searchTerm)) ||
      transaction.timestamp.toLowerCase().includes(searchTerm) ||
      transaction.status.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center px-2">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm"
        />
      </div>

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
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onViewDetails(transaction)}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>{transaction.studentId}</TableCell>
              <TableCell>{transaction.studentReference}</TableCell>
              <TableCell>{transaction.firstName}</TableCell>
              <TableCell>{transaction.lastName}</TableCell>
              <TableCell>{transaction.email}</TableCell>
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
    </div>
  );
}
