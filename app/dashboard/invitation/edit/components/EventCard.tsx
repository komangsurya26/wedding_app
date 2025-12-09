import { Button } from "@/components/ui/button";
import { EventInput } from "./EventInput";

export function EventCard({
  index,
  control,
  remove,
  isSubmitting,
}: {
  index: number;
  control: any;
  remove: (index: number) => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="p-4 border rounded-md shadow-sm relative">
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">Acara #{index + 1}</div>
        {index > 0 && (
          <Button
            type="button"
            onClick={() => remove(index)}
            className="text-sm"
            variant="destructive"
            disabled={isSubmitting}
          >
            Hapus
          </Button>
        )}
      </div>
      <div className="space-y-3">
        <EventInput
          control={control}
          name={`events.${index}.title`}
          label="Judul"
          placeholder="Resepsi"
        />
        <EventInput
          control={control}
          name={`events.${index}.date`}
          label="Tanggal"
          type="date"
        />
        <div className="flex gap-3">
          <EventInput
            control={control}
            name={`events.${index}.start_time`}
            label="Waktu Mulai"
            type="time"
          />
          <EventInput
            control={control}
            name={`events.${index}.end_time`}
            label="Waktu Selesai"
            type="time"
          />
        </div>
        <EventInput
          control={control}
          name={`events.${index}.venue`}
          label="Lokasi"
          placeholder="Gang Mawar No 7..."
        />
        <EventInput
          control={control}
          name={`events.${index}.location_url`}
          label="Lokasi URL"
          placeholder="https://maps.app.goo.gl/..."
        />
      </div>
    </div>
  );
}
