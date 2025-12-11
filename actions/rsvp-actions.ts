"use server";

import { createServiceClient } from "@/utils/supabase/service";

// Types
export type RSVPAttendance = "yes" | "no";

export type CreateRSVPData = {
    invitation_id: number;
    name: string;
    attendance: RSVPAttendance;
    guest_count: number;
    message?: string;
};

export type RSVPRecord = {
    id: number;
    invitation_id: number;
    name: string;
    attendance: RSVPAttendance;
    guest_count: number;
    message: string | null;
    created_at: string;
};

/**
 * Create a new RSVP entry
 * The invitation_id is validated server-side by slug
 */
export async function createRSVP({
    invitation_id,
    name,
    attendance,
    guest_count,
    message,
}: CreateRSVPData): Promise<RSVPRecord> {
    const supabase = await createServiceClient();

    // Validate that the invitation exists
    const { data: invitation, error: invError } = await supabase
        .from("invitations")
        .select("id")
        .eq("id", invitation_id)
        .single();

    if (invError || !invitation) {
        throw new Error("Undangan tidak ditemukan");
    }

    // Insert RSVP
    const { data, error } = await supabase
        .from("rsvps")
        .insert({
            invitation_id,
            name: name.trim(),
            attendance,
            guest_count: attendance === "yes" ? guest_count : 0,
            message: message?.trim() || null,
        })
        .select()
        .single();

    if (error) {
        console.error("[createRSVP] Error:", error);
        throw new Error("Gagal menyimpan RSVP");
    }

    return data;
}

/**
 * Fetch RSVPs for a specific invitation
 */
export async function fetchRSVPsByInvitation(
    invitation_id: number
): Promise<RSVPRecord[]> {
    const supabase = await createServiceClient();

    const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .eq("invitation_id", invitation_id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("[fetchRSVPsByInvitation] Error:", error);
        throw new Error("Gagal memuat RSVP");
    }

    return data || [];
}

/**
 * Fetch all RSVPs for the current user's invitations (for dashboard)
 */
export async function fetchAllUserRSVPs(): Promise<
    (RSVPRecord & { invitation_name: string })[]
> {
    const supabase = await createServiceClient();

    const { data, error } = await supabase
        .from("rsvps")
        .select(`
            *,
            invitations!inner(invitation_name, user_id)
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("[fetchAllUserRSVPs] Error:", error);
        throw new Error("Gagal memuat RSVP");
    }

    // Transform data to include invitation_name
    return (data || []).map((item: any) => ({
        id: item.id,
        invitation_id: item.invitation_id,
        name: item.name,
        attendance: item.attendance,
        guest_count: item.guest_count,
        message: item.message,
        created_at: item.created_at,
        invitation_name: item.invitations?.invitation_name || "Undangan",
    }));
}
