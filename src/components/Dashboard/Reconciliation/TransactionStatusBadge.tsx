
import { Badge } from "@/components/ui/badge";

interface TransactionStatusBadgeProps {
  status: string;
}

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  return (
    <Badge
      variant={
        status === "completed"
          ? "default"
          : status === "pending"
          ? "secondary"
          : status === "refund"
          ? "outline"
          : "destructive"
      }
    >
      {status}
    </Badge>
  );
}
