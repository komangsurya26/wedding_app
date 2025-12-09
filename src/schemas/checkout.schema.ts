import z from "zod";

export const PaymentSchema = z.object({
    template_id: z.number(),
    invitation_id: z.number().optional(),
    title_invitation: z.string().min(1).max(100),  // batasi panjang
    url_invitation: z.url(),    // harus URL valid jika ada
});

export const TrialSchema = z.object({
    template_id: z.number(),
    invitation_name: z.string().min(1).max(100),
    invitation_url: z.url(),
    slug: z.string().min(1).max(50).regex(/^[a-zA-Z0-9-_]+$/),
});