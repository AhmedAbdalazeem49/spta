import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
  id?: string;
  name?: string;
  containerClassName?: string;
  disabled?: boolean;
}

const SelectField = ({
  label,
  error,
  hint,
  value,
  onChange,
  options,
  placeholder,
  id,
  name,
  containerClassName,
  disabled,
}: SelectFieldProps) => {
  const inputId = id || name;
  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={inputId}
          aria-invalid={!!error}
          className={cn(error && "border-destructive focus:ring-destructive")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
};

export default SelectField;
