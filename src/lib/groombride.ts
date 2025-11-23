"use server";

import { z } from "zod";
import { createClient } from "../utils/supabase/server";

const schema = z.object({
    invitation_id: z.number(),
    full_name: z.string(),
    short_name: z.string(),
    child_order: z.string(),
    instagram: z.string(),
    father: z.string(),
    mother: z.string(),
});

type PhotoGroomBrides = {
    image_url: string
    public_id: string
}


export async function createGroomBride({
    type,
    invitationId,
    fullName,
    shortName,
    childOrder,
    father,
    mother,
    instagram,
    photos
}: {
    type: string
    invitationId: number
    fullName: string
    shortName: string
    childOrder?: string
    father?: string
    mother?: string
    instagram?: string
    photos?: PhotoGroomBrides[]
}) {
    try {
        const supabase = await createClient()

        const invitation_id = invitationId
        const full_name = fullName
        const short_name = shortName
        const child_order = childOrder

        const parsed = schema.parse({
            invitation_id,
            full_name,
            short_name,
            child_order,
            instagram,
            father,
            mother,
        });

        const { error } = await supabase
            .from(type === "groom" ? "grooms" : "brides")
            .upsert(parsed, { onConflict: "invitation_id" })
            .select()
            .single();
        if (error) throw error


        if (photos && photos.length > 0) {
            const { error: deleteError } = await supabase
                .from(type === "groom" ? "photo_grooms" : "photo_brides")
                .delete()
                .eq("invitation_id", invitationId);

            if (deleteError) throw deleteError;

            const payload = photos
                .filter((p) => p.image_url)
                .map((p) => ({
                    invitation_id: invitationId,
                    image_url: p.image_url,
                    public_id: p.public_id,
                }));

            const { error: photoError } = await supabase
                .from(type === "groom" ? "photo_grooms" : "photo_brides")
                .insert(payload)
                .select();
            if (photoError) throw photoError;
        }
    } catch (err) {
        throw err;
    }
}

