import { z } from "zod";

export const GroomSchema = z.object({
    fullName: z.string().min(1, "Nama wajib diisi"),
    shortName: z.string().min(1, "Nama wajib diisi"),
    childOrder: z.string().optional(),
    instagram: z.string().optional(),
    father: z.string().optional(),
    mother: z.string().optional(),
});

export type GroomSchemaType = z.infer<typeof GroomSchema>;