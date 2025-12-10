import { z } from "zod";

export const GiftSchema = z.object({
    bank_name: z.string().min(1, "Nama bank wajib diisi"),
    account_number: z.string().min(1, "Nomer rekening wajib diisi"),
    owner: z.string().min(1, "Atas nama wajib diisi"),
    logo: z.string().optional(),
});

export const GiftsArraySchema = z.object({
    gifts: z.array(GiftSchema),
});

// untuk array
export type GiftsArraySchemaType = z.infer<typeof GiftsArraySchema>;