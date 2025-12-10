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
        if (error) throw error
    } catch (err) {
        throw err;
    }
}

export async function fetchAudio({
    invitation_id,
}: {
    invitation_id: number
}) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("audios")
            .select("*")
            .eq("invitation_id", invitation_id)
            .maybeSingle();

        if (error) throw error

        if (!data) return null;

        return {
            music_code: data.music_code,
            music_title: data.music_title,
            music_url: data.music_url,
        }
    } catch (err) {
        throw err;
    }
}



