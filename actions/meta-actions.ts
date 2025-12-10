"use server";

import { createClient } from "../utils/supabase/server";

export type MetaData = {
    title?: string;
    description?: string;
    image_url?: string;
    public_id?: string;
    invitation_id: number;
};

export async function createMeta({
    invitation_id,
    title,
    description,
    image_url,
    public_id,
}: MetaData) {
    try {
        const supabase = await createClient();

        const payload = {
            invitation_id,
            title,
            description,
            image_url,
            public_id,
        };

        const { error } = await supabase
            .from("meta_data")
            .upsert(payload, { onConflict: "invitation_id" });

        if (error) throw error;
    } catch (err) {
        throw err;
    }
}

export async function fetchMeta({ invitation_id }: { invitation_id: number }) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("meta_data")
            .select("*")
            .eq("invitation_id", invitation_id)
            .maybeSingle();

        if (error) throw error;

        return data;
    } catch (err) {
        throw err;
    }
}
