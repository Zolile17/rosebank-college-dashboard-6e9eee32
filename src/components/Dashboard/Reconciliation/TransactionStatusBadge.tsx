
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TransactionStatusBadgeProps {
  status: string;
}

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  const statusClasses = {
    successful: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80",
    completed: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80",
    pending: "bg-amber-100 text-amber-800 hover:bg-amber-100/80",
    failed: "bg-red-100 text-red-800 hover:bg-red-100/80",
    refund: "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("capitalize", statusClasses[status as keyof typeof statusClasses] || "bg-gray-100 text-gray-800")}
    >
      {status}
    </Badge>
  );
}
