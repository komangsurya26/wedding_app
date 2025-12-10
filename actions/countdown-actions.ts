"use server";

import { createClient } from "../utils/supabase/server";

export async function createCountdown({
    invitation_id,
    date,
    time
}: {
    invitation_id: number
    date: string
    time: string
}) {
    try {
        const supabase = await createClient()

        const payload = {
            invitation_id,
            date,
            time
        };

        const { error } = await supabase
            .from("countdowns")
            .upsert(payload, { onConflict: "invitation_id" })
        if (error) throw error
    } catch (err) {
        throw err;
    }
}

export async function fetchCountdown({
    invitation_id,
}: {
    invitation_id: number
}) {
    try {
        const supabase = await createClient()

        const { error, data } = await supabase
            .from("countdowns")
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


