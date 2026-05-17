import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const SectionHeader = ({ title, description, action, className }: Props) => (
  <div className={cn("flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4", className)}>
    <div>
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
    {action}
  </div>
);

export default SectionHeader;
