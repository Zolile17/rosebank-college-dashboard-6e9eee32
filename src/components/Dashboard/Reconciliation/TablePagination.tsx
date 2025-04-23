
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function TablePagination({ 
  currentPage, 
  totalPages, 
  totalItems,
  itemsPerPage,
  onPrevPage, 
  onNextPage 
}: TablePaginationProps) {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500">
        Showing {indexOfFirstItem} to{" "}
        {indexOfLastItem} of{" "}
        {totalItems} transactions
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Previous
        </Button>
        <span className="flex items-center px-3">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
