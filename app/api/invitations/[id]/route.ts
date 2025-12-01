import { createClient } from '@/src/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/invitations/[id]'>) {
    const { id } = await ctx.params
    const invitationId = Number(id);

    const supabase = createClient()

    const { data: { user }, error } = await (await supabase).auth.getUser()
    if (error) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { data: invitation, error: invitError } = await (await supabase)
            .from("invitations")
            .select("*")
            .eq("id", invitationId)
            .maybeSingle()

        if (invitError) {
            return NextResponse.json(
                { ok: false, error: "Failed to fetch invitation" },
                { status: 500 }
            );
        }

        if (!invitation) {
            return NextResponse.json({ ok: false, error: "Invitation not found" }, { status: 404 });
        }

        if (String(invitation.user_id) !== String(user?.id)) {
            return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
        }

        return Response.json({ ok: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
    }

}