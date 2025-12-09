"use server";

import { createClient } from "../utils/supabase/server";

export async function createGift(events: {
    invitation_id: number
    bank_name: string
    account_number: string
    owner: string
    logo?: string
}[]) {
    try {
        const supabase = await createClient()

        const { error: deleteError } = await supabase
            .from("gifts")
            .delete()
            .eq("invitation_id", events[0].invitation_id);

        if (deleteError) throw deleteError;

        const { error } = await supabase
            .from("gifts")
            .upsert(events)

        if (error) throw error

    } catch (err) {
        throw err;
    }
}

export async function fetchGift({
    invitation_id
}: {
    invitation_id: number
}) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("gifts")
            .select("*")
            .eq("invitation_id", invitation_id);

        if (error) throw error

        if (data.length > 0) {
            return data
        }

        return null
    } catch (err) {
        throw err;
    }
}

