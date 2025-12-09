import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createClient();
    const { data: { user }, error: userErr } = await (await supabase).auth.getUser();

    if (userErr || !user) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await (await supabase)
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
}
