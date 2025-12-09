import { NextResponse } from "next/server";
import { createClient } from "@/src/utils/supabase/server";
import { TEMPLATE_LIST } from "@/src/lib/template-data";
import { TrialSchema } from "@/src/schemas/checkout.schema";
import { addDay } from "@/src/lib/utils";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate payload via Zod
        const parsed = TrialSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "Invalid payload",
                    details: parsed.error.message,
                },
                { status: 400 }
            );
        }

        const payload = parsed.data;

        // Supabase Auth
        const supabase = await createClient();
        const {
            data: { user },
            error: userErr,
        } = await supabase.auth.getUser();

        if (!user || userErr) {
            return NextResponse.json(
                { ok: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Check if user already has a trial invitation
        const { data: invitations, error: invitError } = await supabase
            .from("invitations")
            .select("*")
            .eq("user_id", user.id)
            .limit(1);

        if (invitError) {
            return NextResponse.json(
                { ok: false, error: "Failed checking invitations" },
                { status: 500 }
            );
        }

        if (invitations.length > 0) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "User already has a trial invitation",
                },
                { status: 400 }
            );
        }

        // Validate template
        const template = TEMPLATE_LIST.find((t) => t.id === payload.template_id);
        if (!template) {
            return NextResponse.json(
                { ok: false, error: "Template not found" },
                { status: 404 }
            );
        }

        // Create trial invitation
        const expiresAt = addDay(new Date(), 1).toISOString();

        const { error: createError } = await supabase
            .from("invitations")
            .insert({
                ...payload,
                user_id: user.id,
                expires_at: expiresAt,
                template_id: template.id,
            });

        if (createError) {
            return NextResponse.json(
                { ok: false, error: "Failed to create trial invitation" },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json(
            { ok: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
