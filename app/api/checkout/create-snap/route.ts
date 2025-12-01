import { createClient } from "@/src/utils/supabase/server";
import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";


const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || "";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY
});


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { orderId, amount, item = {}, customer = {} } = body

        if (!orderId || !amount) {
            return NextResponse.json({ ok: false, error: "Tidak ada orderId atau total" }, { status: 400 });
        }

        const supabase = await createClient()
        const payloadOrder = {
            user_id: customer.id,
            order_ref: orderId,
            template_id: item.id,
            title_invitation: item.title_invitation,
            url_invitation: item.url_invitation,
            amount: amount,
        }
        const { error } = await supabase
            .from("orders")
            .insert(payloadOrder)
            .select()
            .single();
        if (error) throw error

        const payload = {
            transaction_details: {
                order_id: String(orderId),
                gross_amount: Number(amount),
            },
            item_details: [item],
            customer_details: customer,
        };

        const response = await snap.createTransaction(payload)

        return NextResponse.json({ ok: true, data: response });
    } catch (err) {
        return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
    }
}
