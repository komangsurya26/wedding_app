// app/api/me/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/src/utils/supabase/server";

export async function GET() {
    try {
        // Buat supabase client yang membaca cookie (server-side)
        const supabase = createClient();

        // Ambil user dari auth
        const { data: { user }, error } = await (await supabase).auth.getUser();

        if (error) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const { data: profile } = await (await supabase)
            .from("profiles").select("*")
            .eq("id", user?.id)
            .single();

        return NextResponse.json({ user: profile }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ user: null, error: "internal_server_error" }, { status: 500 });
    }
}
