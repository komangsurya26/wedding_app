"use server";

import { z } from "zod";
import { createClient } from "../utils/supabase/server";

const schema = z.object({
    invitation_id: z.number(),
    full_name: z.string(),
    short_name: z.string(),
    child_order: z.string(),
    instagram: z.string(),
    father: z.string(),
    mother: z.string(),
});


export async function createGroomBride({
    type,
    invitationId,
    fullName,
    shortName,
    childOrder,
    father,
    mother,
    instagram
}: {
    type: string
    invitationId: number
    fullName: string
    shortName: string
    childOrder?: string
    father?: string
    mother?: string
    instagram?: string
}) {
    try {
        const supabase = await createClient()

        const invitation_id = invitationId
        const full_name = fullName
        const short_name = shortName
        const child_order = childOrder

        const parsed = schema.parse({
            invitation_id,
            full_name,
            short_name,
            child_order,
            instagram,
            father,
            mother,
        });

        const { data, error } = await supabase
            .from(type === "groom" ? "grooms" : "brides")
            .insert(parsed)
            .select()
            .single();

        if (error) {
            throw error
        }
    } catch (err) {
        throw err;
    }
}
