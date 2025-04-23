import { ReactNode } from "react";
import { usePageLoading } from "@/hooks/usePageLoading";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  // This hook will handle showing the loader on page navigation
  usePageLoading();
  
  return <>{children}</>;
} 