import { getBase64 } from "@/src/services/midtrans";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const NEXT_PUBLIC_URL_MIDTRANS = process.env.NEXT_PUBLIC_URL_MIDTRANS;

const Schema = z.object({
    order_ref: z.string().min(1, "order_ref required"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { ok: false, error: "Invalid payload", details: parsed.error.message },
                { status: 400 }
            );
        }
        const { order_ref } = parsed.data;

        const auth = getBase64()

        const midtransRes = await fetch(
            `${NEXT_PUBLIC_URL_MIDTRANS}/${order_ref}/cancel`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Basic ${auth}`,
                },
            }
        );
        const data = await midtransRes.json();
        return NextResponse.json({ ok: true, data });
    } catch (error) {
        return NextResponse.json(
            { ok: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
