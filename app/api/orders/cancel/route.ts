import { getBase64 } from "@/src/lib/midtrans";
import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_URL_MIDTRANS = process.env.NEXT_PUBLIC_URL_MIDTRANS;

export async function POST(req: NextRequest) {
    try {
        const { order_ref } = await req.json();

        if (!order_ref) {
            return NextResponse.json(
                { error: "order_ref required" },
                { status: 400 }
            );
        }

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
            { ok: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}
