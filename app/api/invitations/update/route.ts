import { TEMPLATE_LIST } from "@/lib/template-data";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import z from "zod";

const Schema = z.object({
    invitation_id: z.number(),
    template_id: z.number(),
});

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: userErr } = await supabase.auth.getUser();

        if (userErr || !user) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { ok: false, error: "Invalid payload", details: parsed.error.message },
                { status: 400 }
            );
        }

        const { invitation_id, template_id } = parsed.data;

        const { data: invitations, error: fetchError } = await supabase
            .from("invitations")
            .select("user_id, template_type")
            .eq("id", invitation_id)
            .maybeSingle();

        if (fetchError) throw fetchError;

        if (!invitations) {
            return NextResponse.json({ ok: false, error: "Invitation not found" }, { status: 404 });
        }

        // Cek ownership
        if (invitations.user_id !== user.id) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 403 });
        }

        const template = TEMPLATE_LIST.find(t => t.id === template_id);
        if (!template) {
            return NextResponse.json({ ok: false, error: "Template not found" }, { status: 404 });
        }

        // cek apakah template type invitations sama
        if (template.type !== invitations.template_type) {
            return NextResponse.json({ ok: false, error: "Invalid template type" }, { status: 400 });
        }

        const { error, data } = await supabase
            .from("invitations")
            .update({ template_id })
            .eq("id", invitation_id)

        if (error) throw error

        return NextResponse.json({ ok: true, data });
    } catch (error) {
        return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
    }
}