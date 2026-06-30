import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronDown, Phone, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  // Arabic Countries
  { name: "السعودية", nameEn: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "الإمارات", nameEn: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "الكويت", nameEn: "Kuwait", code: "+965", flag: "🇰🇼" },
  { name: "قطر", nameEn: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "البحرين", nameEn: "Bahrain", code: "+973", flag: "🇧🇭" },
  { name: "عمان", nameEn: "Oman", code: "+968", flag: "🇴🇲" },
  { name: "مصر", nameEn: "Egypt", code: "+20", flag: "🇪🇬" },
  { name: "الأردن", nameEn: "Jordan", code: "+962", flag: "🇯🇴" },
  { name: "فلسطين", nameEn: "Palestine", code: "+970", flag: "🇵🇸" },
  { name: "سوريا", nameEn: "Syria", code: "+963", flag: "🇸🇾" },
  { name: "لبنان", nameEn: "Lebanon", code: "+961", flag: "🇱🇧" },
  { name: "العراق", nameEn: "Iraq", code: "+964", flag: "🇮🇶" },
  { name: "اليمن", nameEn: "Yemen", code: "+967", flag: "🇾🇪" },
  { name: "السودان", nameEn: "Sudan", code: "+249", flag: "🇸🇩" },
  { name: "ليبيا", nameEn: "Libya", code: "+218", flag: "🇱🇾" },
  { name: "تونس", nameEn: "Tunisia", code: "+216", flag: "🇹🇳" },
  { name: "الجزائر", nameEn: "Algeria", code: "+213", flag: "🇩🇿" },
  { name: "المغرب", nameEn: "Morocco", code: "+212", flag: "🇲🇦" },
  { name: "موريتانيا", nameEn: "Mauritania", code: "+222", flag: "🇲🇷" },
  { name: "الصومال", nameEn: "Somalia", code: "+252", flag: "🇸🇴" },
  { name: "جيبوتي", nameEn: "Djibouti", code: "+253", flag: "🇩🇯" },
  { name: "جزر القمر", nameEn: "Comoros", code: "+269", flag: "🇰🇲" },

  // Famous Europe & Asia & Others
  { name: "الولايات المتحدة", nameEn: "United States", code: "+1", flag: "🇺🇸" },
  { name: "المملكة المتحدة", nameEn: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "كندا", nameEn: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "أستراليا", nameEn: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "ألمانيا", nameEn: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "فرنسا", nameEn: "France", code: "+33", flag: "🇫🇷" },
  { name: "إيطاليا", nameEn: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "إسبانيا", nameEn: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "روسيا", nameEn: "Russia", code: "+7", flag: "🇷🇺" },
  { name: "تركيا", nameEn: "Turkey", code: "+90", flag: "🇹🇷" },
  { name: "الصين", nameEn: "China", code: "+86", flag: "🇨🇳" },
  { name: "اليابان", nameEn: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "كوريا الجنوبية", nameEn: "South Korea", code: "+82", flag: "🇰🇷" },
  { name: "الهند", nameEn: "India", code: "+91", flag: "🇮🇳" },
  { name: "باكستان", nameEn: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "إندونيسيا", nameEn: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "ماليزيا", nameEn: "Malaysia", code: "+60", flag: "🇲🇾" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string | null;
  className?: string;
  inputBaseClass?: string;
}

export function PhoneInput({ value, onChange, onBlur, error, className, inputBaseClass }: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  
  // Default to Saudi Arabia
  const [country, setCountry] = useState(COUNTRIES[0]); 
  const [phoneNumber, setPhoneNumber] = useState("");

  // Parse initial value to separate code and number
  useEffect(() => {
    if (value && value.startsWith("+")) {
      const matchedCountry = COUNTRIES.find((c) => value.startsWith(c.code));
      if (matchedCountry) {
        setCountry(matchedCountry);
        setPhoneNumber(value.slice(matchedCountry.code.length).trim());
      } else {
        setPhoneNumber(value);
      }
    } else if (value) {
      // no country code in value
      setPhoneNumber(value);
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/[^\d\s-]/g, ""); // Allow digits, spaces, hyphens
    setPhoneNumber(newNumber);
    onChange(`${country.code}${newNumber}`);
  };

  const handleCountrySelect = (c: typeof COUNTRIES[0]) => {
    setCountry(c);
    setOpen(false);
    onChange(`${c.code}${phoneNumber}`);
  };

  return (
    <div className={cn("relative flex items-center w-full", className)} dir="ltr">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "absolute left-1 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 h-[calc(100%-8px)] rounded-lg hover:bg-muted/60 transition-colors z-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
            )}
          >
            <span className="text-base leading-none">{country.flag}</span>
            <span className="text-xs font-medium text-muted-foreground ml-0.5">{country.code}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="start">
          <Command>
            <CommandInput placeholder="ابحث عن الدولة أو الرمز... / Search..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {COUNTRIES.map((c) => (
                  <CommandItem
                    key={c.nameEn}
                    value={`${c.name} ${c.nameEn} ${c.code}`}
                    onSelect={() => handleCountrySelect(c)}
                    className="flex items-center gap-3 cursor-pointer py-2"
                  >
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="flex-1 text-sm font-medium">{c.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums" dir="ltr">{c.code}</span>
                    {country.nameEn === c.nameEn && (
                      <Check className="w-4 h-4 ml-auto text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
      
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        onBlur={onBlur}
        className={cn(
          inputBaseClass || "w-full h-11 rounded-xl border bg-background text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
          "pl-[100px] pr-10",
          error
            ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
            : "border-border hover:border-primary/50"
        )}
        placeholder="50 123 4567"
        dir="ltr"
      />
    </div>
  );
}
