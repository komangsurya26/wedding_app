import { z } from "zod";

export const EventSchema = z.object({
    title: z.string().min(1, "Judul wajib diisi"),
    date: z.string().min(1, "Tanggal wajib diisi"),
    start_time: z.string().min(1, "Waktu mulai wajib diisi"),
    end_time: z.string().min(1, "Waktu selesai wajib diisi"),
    venue: z.string().min(1, "Lokasi wajib diisi"),
    location_url: z.string().min(1, "Lokasi url wajib diisi"),
});

export const EventsArraySchema = z.object({
    events: z.array(EventSchema),
});

// untuk non array
export type EventSchemaType = z.infer<typeof EventSchema>;
// untuk array
export type EventArraySchemaType = z.infer<typeof EventsArraySchema>;