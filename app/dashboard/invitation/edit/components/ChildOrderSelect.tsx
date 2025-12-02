"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChildOrderSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select key={value} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full text-base font-light">
        <SelectValue placeholder="Pilih anak ke berapa" />
      </SelectTrigger>
      <SelectContent>
        {childOrderOptions.map((v) => (
          <SelectItem key={v.value} value={v.value}>
            {v.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const childOrderOptions = [
  { value: "none", label: "Tidak Diketahui" },
  { value: "pertama", label: "Pertama" },
  { value: "kedua", label: "Kedua" },
  { value: "ketiga", label: "Ketiga" },
  { value: "keempat", label: "Keempat" },
  { value: "kelima", label: "Kelima" },
  { value: "keenam", label: "Keenam" },
  { value: "ketujuh", label: "Ketujuh" },
  { value: "kedelapan", label: "Kedelapan" },
  { value: "kesembilan", label: "Kesembilan" },
  { value: "kesepuluh", label: "Kesepuluh" },
];
