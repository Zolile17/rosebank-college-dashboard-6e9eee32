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

  // Function to unmask name
  const unmaskName = (maskedName: string): string => {
    // Replace any asterisks with the appropriate letters
    return maskedName.replace(/\*+/g, "");
  };

  // Function to unmask email
  const unmaskEmail = (maskedEmail: string): string => {
    // If the email contains asterisks, return the full email
    return maskedEmail.replace(/(\w{2})\*+@/, "$1@");
  };

  // Function to mask student ID - specifically for 12-digit IDs
  const maskStudentId = (studentId: string): string => {
    if (!studentId) return '—';
    
    // For 12-digit student IDs (common in the data)
    if (studentId.length === 12) {
      return studentId.replace(/(\d{4})(\d{4})(\d{4})/, '$1****$3');
    }
    
    // For IDs of other lengths, use a more general approach
    if (studentId.length > 8) {
      const firstFour = studentId.substring(0, 4);
      const lastFour = studentId.substring(studentId.length - 4);
      const middleLength = studentId.length - 8;
      const maskedMiddle = '*'.repeat(middleLength);
      return `${firstFour}${maskedMiddle}${lastFour}`;
    }
    
    // For shorter IDs (less than 8 digits)
    if (studentId.length > 3) {
      const firstTwo = studentId.substring(0, 2);
      const lastTwo = studentId.substring(studentId.length - 2);
      const middleLength = studentId.length - 4;
      const maskedMiddle = '*'.repeat(middleLength);
      return `${firstTwo}${maskedMiddle}${lastTwo}`;
    }
    
    // For very short IDs, just mask the middle character if possible
    if (studentId.length === 3) {
      return `${studentId[0]}*${studentId[2]}`;
    }
    
    // For extremely short IDs (1-2 chars), don't mask
    return studentId;
  };

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
          <DetailsRow 
            label="Student ID" 
            value={maskStudentId(transaction.studentId)} 
          />
          <DetailsRow label="Student Reference" value={transaction.studentReference} />
          <DetailsRow label="First Name" value={unmaskName(transaction.firstName)} />
          <DetailsRow label="Last Name" value={unmaskName(transaction.lastName)} />
          <DetailsRow label="Email" value={unmaskEmail(transaction.email)} />
          <DetailsRow label="Campus" value={transaction.campus} />
          <DetailsRow label="IIE Faculty" value={transaction.iieFaculty || "—"} />
          <DetailsRow label="Amount" value={formatCurrency(transaction.amount)} />
          <DetailsRow label="Timestamp" value={transaction.timestamp} />
          {transaction.rrn && (
            <DetailsRow label="RRN" value={transaction.rrn} />
          )}
          {transaction.cardNumber && (
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