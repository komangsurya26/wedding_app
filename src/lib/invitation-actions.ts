"use server";

import { createClient } from "../utils/supabase/server";

type Payload = {
    user_id: string
    template_id: string,
    invitation_name: string,
    invitation_url: string,
    expires_at: string
}

export async function createTrialInvitation({ payload }: { payload: Payload }) {
    try {
        const supabase = await createClient()
        const { data: { user }, error: userErr } = await supabase.auth.getUser();
        if (!user || userErr) {
            throw new Error("Unauthorized")
        }

        const { data, error } = await supabase
            .from("invitations")
            .select("*")
            .eq("user_id", user.id);

        if (error) throw error

        if (data.length > 0) {
            throw new Error("Already have invitations")
        }

        const { error: errCreate } = await supabase
            .from("invitations")
            .insert(payload)

        if (errCreate) {
            throw errCreate
        }
    } catch (err) {
        throw err;
    }
}


