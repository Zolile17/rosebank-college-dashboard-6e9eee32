import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "@/context/LoadingContext";

export function usePageLoading() {
  const { startLoading, stopLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading();
    }, 1000);

    startLoading();

    return () => {
      clearTimeout(timer);
      stopLoading();
    };
  }, [location.pathname, startLoading, stopLoading]);
} 