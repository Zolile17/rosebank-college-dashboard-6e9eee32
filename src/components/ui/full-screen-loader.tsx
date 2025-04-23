import { Loader } from "./loader";

interface FullScreenLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function FullScreenLoader({ className, size = "lg" }: FullScreenLoaderProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader size={size} className={className} />
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
} 