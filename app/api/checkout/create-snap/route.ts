import { TEMPLATE_LIST } from "@/src/lib/template-data";
import { PaymentSchema } from "@/src/schemas/checkout.schema";
import { MidtransCustomerProps, MidtransItemProps, PaymentProps } from "@/src/types";
import { createClient } from "@/src/utils/supabase/server";
import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";


const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || "";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY
});


export async function POST(req: Request) {
    try {
        // Authenticate user
        const supabase = await createClient();
        const { data: { user }, error: errorUser } = await supabase.auth.getUser()

        if (errorUser || !user) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        // Parse request body
        const body = await req.json();
        const parsed = PaymentSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ ok: false, error: "Invalid payload", details: parsed.error.message }, { status: 400 });
        }

        const { template_id, invitation_id, title_invitation, url_invitation } = parsed.data;

        // Membuat order ID unik
        const orderRef = uuid();

        // Menampilkan item
        const template = TEMPLATE_LIST.find(t => t.id === template_id);
        if (!template) {
            return NextResponse.json({ ok: false, error: "Template not found" }, { status: 404 });
        }

        const item: MidtransItemProps = {
            id: String(template.id),
            price: Number(template.price),
            quantity: 1, // default 1
            name: template.name,
        }

        const customer: MidtransCustomerProps = {
            id: user.id,
            first_name: user.user_metadata.full_name,
            email: user.email!
        }

        const payload = {
            transaction_details: {
                order_id: orderRef,
                gross_amount: item.price,
            },
            item_details: [item],
            customer_details: customer,
        };

        const response = await snap.createTransaction(payload)

        const payloadOrder = {
            user_id: customer.id,
            order_ref: orderRef,
            template_id: item.id,
            invitation_id: invitation_id,
            title_invitation: title_invitation,
            url_invitation: url_invitation,
            amount: item.price,
            url_payment: response.redirect_url,
            status: "WAITING_PAYMENT",
        }
        const { error } = await supabase
            .from("orders")
            .insert(payloadOrder)
        if (error) throw error

        return NextResponse.json({ ok: true, data: response });
    } catch (err) {
        return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
    }
}
