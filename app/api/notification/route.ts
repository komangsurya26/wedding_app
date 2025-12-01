import { createClient } from "@/src/utils/supabase/server";
import { NextResponse } from "next/server";
import { verifySignature } from "@/src/lib/midtrans";

export async function POST(req: Request) {
    const raw = await req.text()
    let payload: any;
    try {
        payload = JSON.parse(raw)
    } catch (error) {
        return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
    }
    const { order_id, status_code, gross_amount, transaction_status, signature_key } = payload;

    if (!verifySignature({ order_id, status_code, gross_amount, signature_key })) {
        return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 });
    }

    const supabase = createClient()

    if (transaction_status === "settlement" || transaction_status === "capture") {
        await (await supabase)
            .from("orders")
            .update({ status: "PAID", paid_at: new Date().toISOString() })
            .eq("order_ref", order_id);
    } else if (transaction_status === "pending") {
        await (await supabase).from("orders").update({ status: "PENDING" }).eq("order_ref", order_id);
    } else if (transaction_status === "deny" || transaction_status === "cancel" || transaction_status === "expire") {
        await (await supabase).from("orders").update({ status: "FAILED", expires_at: new Date().toISOString() }).eq("order_ref", order_id);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
}
