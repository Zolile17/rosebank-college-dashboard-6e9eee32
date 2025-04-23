
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Transaction } from "./types";
import { TransactionStatusBadge } from "./TransactionStatusBadge";

interface DetailsRowProps {
  label: string;
  value: React.ReactNode;
}

const DetailsRow = ({ label, value }: DetailsRowProps) => (
  <div className="grid grid-cols-2 gap-4 py-2 border-b border-border/30">
    <div className="font-medium text-muted-foreground">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

interface TransactionDetailsDialogProps {
  isOpen: boolean;
  transaction: Transaction | null;
  formatCurrency: (value: number) => string;
  onClose: () => void;
}

export function TransactionDetailsDialog({
  isOpen,
  transaction,
  formatCurrency,
  onClose
}: TransactionDetailsDialogProps) {
  if (!transaction) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Transaction Details
            <TransactionStatusBadge status={transaction.status} />
          </DialogTitle>
          <DialogDescription>
            Transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <DetailsRow label="Student Reference" value={transaction.studentReference} />
          <DetailsRow label="First Name" value={transaction.firstName} />
          <DetailsRow label="Last Name" value={transaction.lastName} />
          <DetailsRow label="Email" value={transaction.email} />
          <DetailsRow label="Campus" value={transaction.campus} />
          <DetailsRow label="Payer First Name" value={transaction.payerFirstName} />
          <DetailsRow label="Payer Last Name" value={transaction.payerLastName} />
          <DetailsRow label="Payment Type" value={transaction.paymentType} />
          <DetailsRow label="Amount" value={formatCurrency(transaction.amount)} />
          <DetailsRow label="Timestamp" value={transaction.timestamp} />
          {transaction.rrn && (
            <DetailsRow label="RRN" value={transaction.rrn} />
          )}
          {transaction.cardNumber && transaction.paymentType === "Card" && (
            <DetailsRow label="Card Number" value={transaction.cardNumber} />
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
