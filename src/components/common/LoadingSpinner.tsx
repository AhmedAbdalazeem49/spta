import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
  className?: string;
  size?: number;
  label?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ className, size = 24, label, fullScreen }: Props) => {
  const inner = (
    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className={cn("animate-spin", className)} style={{ width: size, height: size }} />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
  if (fullScreen) {
    return <div className="min-h-[60vh] flex items-center justify-center">{inner}</div>;
  }
  return inner;
};

export default LoadingSpinner;
