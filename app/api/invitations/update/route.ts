import { TEMPLATE_LIST } from "@/src/lib/template-data";
import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";
import z from "zod";

const Schema = z.object({
    invitation_id: z.number(),
    template_id: z.number(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { ok: false, error: "Invalid payload", details: parsed.error.message },
                { status: 400 }
            );
        }

        const { invitation_id, template_id } = parsed.data;

        const template = TEMPLATE_LIST.find(t => t.id === template_id);
        if (!template) {
            return NextResponse.json({ ok: false, error: "Template not found" }, { status: 404 });
        }

        const templateType = template.type;

        const supabase = await createClient();
        const { error, data } = await supabase
            .from("invitations")
            .update({ template_id, template_type: templateType })
            .eq("id", invitation_id)

        if (error) throw error

        return NextResponse.json({ ok: true, data });
    } catch (error) {
        return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }
}