import { createClient } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const slug = req.nextUrl.searchParams.get("slug");

        if (slug) {
            const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");

            const now = new Date().toISOString();

            const { data, error } = await (await createServiceClient())
                .from("invitations")
                .select(`
                    id,
                    slug,
                    template_id,
                    expires_at,
                    
                    events(*),
                    grooms(*),
                    brides(*),
                    audios(*),
                    gifts(*),
                    countdowns(*),
                    photo_brides(*),
                    photo_grooms(*),
                    photo_landscapes(*),
                    photo_portraits(*),
                    video_youtubes(*)
                `)
                .eq("slug", safeSlug)
                .gt("expires_at", now)
                .limit(1)
                .single();

            if (error) {
                console.error("[GET /invitations] Error public slug:", error);
                return NextResponse.json(
                    { ok: false, error: "Invitation not found or expired" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ ok: true, data });
        }

        const supabase = createClient();

        const { data: { user }, error: userErr } = await (await supabase).auth.getUser();
        if (userErr || !user) {
            return NextResponse.json(
                { ok: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { data, error } = await (await supabase)
            .from("invitations")
            .select("*")
            .eq("user_id", user.id);

        if (error) {
            console.error("[GET /invitations] Error user fetch:", error);
            return NextResponse.json(
                { ok: false, error: "Internal server error" },
                { status: 500 }
            );
        }
        return NextResponse.json({ ok: true, data });
    } catch (error) {
        console.error("[GET /invitations] Fatal error:", error);
        return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
    }
}
