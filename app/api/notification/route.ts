import { NextResponse } from "next/server";
import { verifySignature } from "@/src/lib/midtrans";
import { createServiceClient } from "@/src/utils/supabase/service";
import { addMonths } from "@/src/lib/utils";

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

    const supabase = await createServiceClient()

    if (transaction_status === "settlement" || transaction_status === "capture") {
        const { data: orders } = await supabase
            .from("orders")
            .update({ status: "PAID", paid_at: new Date().toISOString() })
            .eq("order_ref", order_id)
            .select("*")
            .single()

        // jika invitation id ada
        if (orders.invitation_id) {
            await supabase
            .from("invitations")
            .update({
                status: "ACTIVE",
                expires_at: addMonths(new Date(), 6).toISOString()
            })
            .eq("id", orders.invitation_id)
            return NextResponse.json({ ok: true, message: "Status settlement sukses" }, { status: 200 });
        }
        
        // create invitations baru
        const insertInvitation = {
            user_id: orders.user_id,
            template_id: orders.template_id,
            invitation_name: orders.title_invitation,
            invitation_url: orders.url_invitation,
            status: "ACTIVE",
            expires_at: addMonths(new Date(), 6).toISOString() // now tambah 6 bulan
        }
        await supabase
            .from("invitations")
            .insert(insertInvitation)
        return NextResponse.json({ ok: true, message: "Status settlement sukses" }, { status: 200 });
    } else if (transaction_status === "pending") {
        await supabase.from("orders").update({ status: "PENDING" }).eq("order_ref", order_id);
        return NextResponse.json({ ok: true, message: "Status pending sukses" }, { status: 200 });
    } else if (transaction_status === "deny" || transaction_status === "cancel" || transaction_status === "expire") {
        await supabase.from("orders").update({ status: "FAILED", expires_at: new Date().toISOString() }).eq("order_ref", order_id);
        return NextResponse.json({ ok: true, message: "Status expired sukses" }, { status: 200 });
    }
}
