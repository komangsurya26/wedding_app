"use server";

import { createClient } from "../utils/supabase/server";

export async function createAudio({
    invitation_id,
    music_code,
    music_title,
    music_url,
}: {
    invitation_id: number
    music_code: string
    music_title: string
    music_url: string
}) {
    try {
        const supabase = await createClient()

        const payload = {
            invitation_id,
            music_code,
            music_title,
            music_url,
        };

        const { error } = await supabase
            .from("audios")
            .upsert(payload, { onConflict: "invitation_id" })
            .select()
            .single();
        if (error) throw error
    } catch (err) {
        throw err;
    }
}

