
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "./types";
import { TransactionStatusBadge } from "./TransactionStatusBadge";

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
  onClose,
}: TransactionDetailsDialogProps) {
  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Transaction Details
            <DialogClose className="h-4 w-4 opacity-70" />
          </DialogTitle>
          <DialogDescription>
            {/* Complete information about transaction */}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">ID:</div>
            <div className="col-span-3">{transaction.id}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Product:</div>
            <div className="col-span-3">
              {transaction.productName}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Customer:</div>
            <div className="col-span-3">{transaction.customer}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Date:</div>
            <div className="col-span-3">{transaction.date}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Amount:</div>
            <div className="col-span-3">
              {formatCurrency(transaction.amount)}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Status:</div>
            <div className="col-span-3">
              <TransactionStatusBadge status={transaction.status} />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Store:</div>
            <div className="col-span-3">
              {transaction.storeLocation}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">RRN:</div>
            <div className="col-span-3">
              {transaction.rrn || "N/A"}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Card Number:</div>
            <div className="col-span-3">
              {transaction.cardNumber || "N/A"}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Served By:</div>
            <div className="col-span-3">
              {transaction.servedBy || "N/A"}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Payment Method:</div>
            <div className="col-span-3">
              {transaction.paymentMethod || "Credit Card"}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-semibold text-left">Notes:</div>
            <div className="col-span-3">
              {transaction.notes || "No additional notes"}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
