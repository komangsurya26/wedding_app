import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MUSICS } from "@/lib/musics-datas";

export function AudioSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  return (
    <Select key={value} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Audio" />
      </SelectTrigger>
      <SelectContent>
        {MUSICS.map((m) => (
          <SelectItem key={m.code} value={m.code}>
            {m.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
