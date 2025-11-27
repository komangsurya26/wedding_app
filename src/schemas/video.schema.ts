import { z } from "zod";

export const VideoSchema = z.object({
    id_video_youtube: z.string().min(1, "Contoh: https://youtu.be/J1HAyer_I8U, masukan: J1HAyer_I8U"),
});

export type VideoSchemaType = z.infer<typeof VideoSchema>;
