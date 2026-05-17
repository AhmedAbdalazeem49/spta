import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CheckboxFieldProps {
  label: ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  error?: string;
  id?: string;
  name?: string;
  containerClassName?: string;
}

const CheckboxField = ({
  label,
  checked,
  onCheckedChange,
  error,
  id,
  name,
  containerClassName,
}: CheckboxFieldProps) => {
  const inputId = id || name;
  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      <label
        htmlFor={inputId}
        className="flex items-start gap-2 cursor-pointer text-sm"
      >
        <Checkbox
          id={inputId}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange?.(v === true)}
          aria-invalid={!!error}
          className={cn("mt-0.5", error && "border-destructive")}
        />
        <span className="leading-snug">{label}</span>
      </label>
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
};

export default CheckboxField;
