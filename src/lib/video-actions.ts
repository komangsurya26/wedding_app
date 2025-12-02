"use server";

import { createClient } from "../utils/supabase/server";

export async function createVideo({
    invitation_id,
    id_video_youtube
}: {
    invitation_id: number
    id_video_youtube: string
}) {
    try {
        const supabase = await createClient()

        const payload = {
            invitation_id,
            id_video_youtube
        };

        const { error } = await supabase
            .from("video_youtubes")
            .upsert(payload, { onConflict: "invitation_id" })
        if (error) throw error
    } catch (err) {
        throw err;
    }
}

