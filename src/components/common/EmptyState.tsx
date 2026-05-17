import { cn } from "@/lib/utils";
import { Inbox, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const EmptyState = ({ icon: Icon = Inbox, title, description, action, className }: Props) => (
  <div className={cn("flex flex-col items-center justify-center text-center py-12 px-4", className)}>
    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
