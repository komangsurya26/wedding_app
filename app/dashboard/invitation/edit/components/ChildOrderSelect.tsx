import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChildOrderSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full text-base font-light">
        <SelectValue placeholder="Pilih anak ke berapa" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="none">Tidak Diketahui</SelectItem>
          <SelectItem value="Pertama">Pertama</SelectItem>
          <SelectItem value="Kedua">Kedua</SelectItem>
          <SelectItem value="Ketiga">Ketiga</SelectItem>
          <SelectItem value="Keempat">Keempat</SelectItem>
          <SelectItem value="Kelima">Kelima</SelectItem>
          <SelectItem value="Keenam">Keenam</SelectItem>
          <SelectItem value="Ketujuh">Ketujuh</SelectItem>
          <SelectItem value="Kedelapan">Kedelapan</SelectItem>
          <SelectItem value="Kesembilan">Kesembilan</SelectItem>
          <SelectItem value="Kesepuluh">Kesepuluh</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
