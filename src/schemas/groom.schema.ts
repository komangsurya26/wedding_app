import { z } from "zod";

export const GroomSchema = z.object({
    full_name: z.string().min(1, "Nama wajib diisi"),
    short_name: z.string().min(1, "Nama wajib diisi"),
    child_order: z.string().optional(),
    instagram: z.string().optional(),
    father: z.string().optional(),
    mother: z.string().optional(),
});

export type GroomSchemaType = z.infer<typeof GroomSchema>;