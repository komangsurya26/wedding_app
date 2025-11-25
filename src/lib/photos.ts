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
                .select();
            if (photoError) throw photoError;
        }
    } catch (err) {
        throw err;
    }
}

