import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BANKS } from "@/src/lib/bank-datas";

export function GiftSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select key={value} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full text-base font-light">
        <SelectValue placeholder="Pilih bank" />
      </SelectTrigger>
      <SelectContent>
        {BANKS.map((b) => (
          <SelectItem key={b.name} value={b.name}>
            {b.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
