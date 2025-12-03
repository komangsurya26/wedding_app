"use server";

import { createClient } from "../utils/supabase/server";

type Photos = {
    image_url: string
    public_id: string
}

export async function createPhotos({ orientation, invitation_id, photos }: {
    orientation: "portrait" | "landscape",
    invitation_id: number
    photos: Photos[]
}) {
    try {
        const supabase = await createClient()

        const table = orientation === "portrait" ? "photo_portraits" : "photo_landscapes"

        if (photos && photos.length > 0) {
            const { error: deleteError } = await supabase
                .from(table)
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
                .from(table)
                .insert(payload)
            if (photoError) throw photoError;
        }
    } catch (err) {
        throw err;
    }
}

export async function fecthPhotos({ invitation_id, orientation }: {
    invitation_id: number,
    orientation: "portrait" | "landscape",
}) {
    try {
        const supabase = await createClient()

        const table = orientation === "portrait" ? "photo_portraits" : "photo_landscapes"
        const { data, error } = await supabase
            .from(table)
            .select("*")
            .eq("invitation_id", invitation_id);

        if (error) {
            throw error
        }

        if (data && data?.length > 0) {
            return data
        }
        return []
    } catch (error) {
        throw error
    }
}

export async function fetchPhotoGrooms({ invitation_id, type }: {
    invitation_id: number,
    type: "groom" | "bride",
}) {
    try {
        const supabase = await createClient()

        const table = type === "groom" ? "photo_grooms" : "photo_brides"
        const { data, error } = await supabase
            .from(table)
            .select("*")
            .eq("invitation_id", invitation_id);

        if (error) {
            throw error
        }

        if (data && data?.length > 0) {
            return data
        }
        return []
    } catch (error) {
        throw error
    }
}

