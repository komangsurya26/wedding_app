import { z } from "zod";

export const MusicSchema = z.object({
    music_code: z.string().min(1, "Pilih salah satu musik"),
    music_title: z.string().min(1),
    music_url: z.string(),
});

export type MusicSchemaType = z.infer<typeof MusicSchema>;
