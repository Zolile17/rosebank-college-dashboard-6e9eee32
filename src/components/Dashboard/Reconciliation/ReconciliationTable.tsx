
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { TransactionTable } from "./TransactionTable";
import { TablePagination } from "./TablePagination";
import { TransactionDetailsDialog } from "./TransactionDetailsDialog";
import { ReconciliationTableProps, Transaction } from "./types";

export { type Transaction } from "./types";
export type { ReconciliationTableProps } from "./types";

export function ReconciliationTable({
  transactions,
  formatCurrency,
}: ReconciliationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Calculate total number of pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Get current transactions to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle view details click
  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Payment Reconciliation</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionTable 
            transactions={currentTransactions} 
            formatCurrency={formatCurrency}
            onViewDetails={handleViewDetails}
          />
          
          <TablePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={transactions.length}
            itemsPerPage={itemsPerPage}
            onPrevPage={prevPage}
            onNextPage={nextPage}
          />
        </CardContent>
      </Card>

      <TransactionDetailsDialog 
        isOpen={isDetailsOpen}
        transaction={selectedTransaction}
        formatCurrency={formatCurrency}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
}
