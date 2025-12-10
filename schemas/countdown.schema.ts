import { z } from "zod";

export const CountdownSchema = z.object({
    date: z.string().min(1, "Masukan hitung mundur acara"),
    time: z.string().min(1, "Masukan hitung mundur acara"),
});

export type CountdownSchemaType = z.infer<typeof CountdownSchema>;
