import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { invitation_id, template_id, template_type } = body

        if (!invitation_id || !template_id) {
            return NextResponse.json({ ok: false, error: "Tidak ada invitation_id atau template_id" }, { status: 400 });
        }

        const supabase = await createClient()

        const { error, data } = await supabase
            .from("invitations")
            .update({ template_id, template_type })
            .eq("id", invitation_id)

        if (error) throw error

        return NextResponse.json({ ok: true, data });
    } catch (error) {
        return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }
}