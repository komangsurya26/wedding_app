import { createClient } from "@/src/utils/supabase/server";
import { createServiceClient } from "@/src/utils/supabase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.searchParams.get("slug");
    if (slug) {
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
            .eq("slug", slug)
            .gt("expires_at", now)
            .single();

        if (error) {
            return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true, data });
    }

    const supabase = createClient();
    const { data: { user }, error: userErr } = await (await supabase).auth.getUser();

    if (userErr || !user) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await (await supabase)
        .from("invitations")
        .select("*")
        .eq("user_id", user.id);

    if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
}
