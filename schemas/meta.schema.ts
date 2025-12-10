import z from "zod";

export const MetaSchema = z.object({
    title: z.string().min(1, "Judul tidak boleh kosong"),
    description: z.string().optional(),
    image_url: z.string().optional(),
    public_id: z.string().optional(),
});

export type MetaSchemaType = z.infer<typeof MetaSchema>;