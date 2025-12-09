"use server";

import { createClient } from "../utils/supabase/server";

export async function createVideoYoutube({
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

export async function fetchVideoYoutube({
    invitation_id,
}: {
    invitation_id: number
}) {
    try {
        const supabase = await createClient()

        const { error, data } = await supabase
            .from("video_youtubes")
            .select("*")
            .eq("invitation_id", invitation_id)
            .maybeSingle()

        if (error) throw error

        if (data) {
            return data
        }
        return null
    } catch (error) {
        throw error
    }
};

