import { NextResponse } from "next/server";
import { verifySignature } from "@/src/services/midtrans";
import { createServiceClient } from "@/src/utils/supabase/service";
import { addMonths } from "@/src/lib/utils";

const TEMPLATE_ACTIVE_DURATION = process.env.TEMPLATE_ACTIVE_DURATION

export async function POST(req: Request) {
    const raw = await req.text()
    let payload: any;
    try {
        payload = JSON.parse(raw)
    } catch (error) {
        return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
    }
    const { order_id, status_code, gross_amount, transaction_status, signature_key, expiry_time } = payload;

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
                    expires_at: addMonths(new Date(), Number(TEMPLATE_ACTIVE_DURATION)).toISOString()
                })
                .eq("id", orders.invitation_id)
            return NextResponse.json({ ok: true, message: "Status settlement sukses" }, { status: 200 });
        }

        // create invitations baru
        const payload = {
            user_id: orders.user_id,
            template_id: orders.template_id,
            invitation_name: orders.title_invitation,
            invitation_url: orders.url_invitation,
            expires_at: addMonths(new Date(), Number(TEMPLATE_ACTIVE_DURATION)).toISOString()
        }
        await supabase
            .from("invitations")
            .insert(payload)
        return NextResponse.json({ ok: true, message: "Status settlement sukses" }, { status: 200 });
    } else if (transaction_status === "pending") {
        await supabase.from("orders").update({ status: "PENDING", expires_at: expiry_time }).eq("order_ref", order_id);
        return NextResponse.json({ ok: true, message: "Status pending sukses" }, { status: 200 });
    } else if (transaction_status === "expire") {
        await supabase.from("orders").update({ status: "EXPIRED" }).eq("order_ref", order_id);
        return NextResponse.json({ ok: true, message: "Status expired sukses" }, { status: 200 });
    } else if (transaction_status === "cancel") {
        await supabase.from("orders").update({ status: "CANCELLED" }).eq("order_ref", order_id);
        return NextResponse.json({ ok: true, message: "Status cancelled sukses" }, { status: 200 });
    } else if (transaction_status === "deny") {
        await supabase.from("orders").update({ status: "FAILED" }).eq("order_ref", order_id);
        return NextResponse.json({ ok: true, message: "Status failed sukses" }, { status: 200 });
    }
}
