import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  selectedStore: string;
  onStoreChange: (store: string) => void;
  hideStoreSelector?: boolean;
}

export function DashboardLayout({
  children,
  title,
  description,
  selectedStore,
  onStoreChange,
  hideStoreSelector = false,
}: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarExpanded, setSidebarExpanded] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out",
          sidebarExpanded ? "w-64" : "w-16",
          isMobile && !sidebarExpanded && "-translate-x-full"
        )}
      >
        <DashboardSidebar expanded={sidebarExpanded} />

        {/* Sidebar toggle button */}
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute -right-3 top-20 z-50 h-6 w-6 rounded-full border bg-background shadow-md" 
            onClick={toggleSidebar}
          >
            {sidebarExpanded ? (
              <ChevronLeftIcon className="h-3 w-3" />
            ) : (
              <ChevronRightIcon className="h-3 w-3" />
            )}
          </Button>
        )}
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden",
        sidebarExpanded ? "ml-64" : "ml-16"
      )}>
        <DashboardHeader 
          title={title}
          description={description}
          selectedStore={selectedStore}
          onStoreChange={onStoreChange}
          toggleSidebar={toggleSidebar}
          sidebarExpanded={sidebarExpanded}
          isMobile={isMobile}
          hideStoreSelector={hideStoreSelector}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarExpanded && (
        <div 
          className="fixed inset-0 z-30 bg-black/50" 
          onClick={() => setSidebarExpanded(false)}
        />
      )}
    </div>
  );
}
