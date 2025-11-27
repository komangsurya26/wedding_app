"use server";

import { createClient } from "../utils/supabase/server";

export async function createEvent(events: {
    invitation_id: number
    title: string
    date: string
    start_time: string
    end_time: string
    venue: string
    location_url: string
}[]) {
    try {
        const supabase = await createClient()

        const { error: deleteError } = await supabase
            .from("events")
            .delete()
            .eq("invitation_id", events[0].invitation_id);

        if (deleteError) throw deleteError;

        const { error } = await supabase
            .from("events")
            .upsert(events)
            .select();

        if (error) throw error

    } catch (err) {
        throw err;
    }
}

