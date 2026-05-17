import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

const ErrorState = ({ title = "Something went wrong", description, onRetry, retryLabel = "Try again", className }: Props) => (
  <div className={cn("flex flex-col items-center justify-center text-center py-12 px-4", className)}>
    <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
      <AlertCircle className="w-6 h-6 text-destructive" />
    </div>
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
    {onRetry && (
      <Button onClick={onRetry} variant="outline" size="sm" className="mt-4">
        {retryLabel}
      </Button>
    )}
  </div>
);

export default ErrorState;
