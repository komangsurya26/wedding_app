"use server";

import { createClient } from "../utils/supabase/server";

type PhotoGroomBrides = {
    image_url: string
    public_id: string
}

export async function createGroomBride({
    type,
    invitation_id,
    full_name,
    short_name,
    child_order,
    father,
    mother,
    instagram,
    photos
}: {
    type: string
    invitation_id: number
    full_name: string
    short_name: string
    child_order?: string
    father?: string
    mother?: string
    instagram?: string
    photos?: PhotoGroomBrides[]
}) {
    try {
        const supabase = await createClient()

        const payload = {
            invitation_id,
            full_name,
            short_name,
            child_order,
            instagram,
            father,
            mother,
        };

        const { error } = await supabase
            .from(type === "groom" ? "grooms" : "brides")
            .upsert(payload, { onConflict: "invitation_id" })
        if (error) throw error


        if (photos && photos.length > 0) {
            const { error: deleteError } = await supabase
                .from(type === "groom" ? "photo_grooms" : "photo_brides")
                .delete()
                .eq("invitation_id", invitation_id);

            if (deleteError) throw deleteError;

            const payload = photos
                .filter((p) => p.image_url)
                .map((p) => ({
                    invitation_id: invitation_id,
                    image_url: p.image_url,
                    public_id: p.public_id,
                }));

            const { error: photoError } = await supabase
                .from(type === "groom" ? "photo_grooms" : "photo_brides")
                .insert(payload)
            if (photoError) throw photoError;
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchGroom({ invitation_id, type }: { invitation_id: number, type: 'groom' | 'bride' }) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from(type === 'groom' ? "grooms" : "brides")
            .select("*")
            .eq("invitation_id", invitation_id)
            .maybeSingle();
        if (error) throw error

        if (!data) return null

        return data
    } catch (err) {
        throw err;
    }
}


