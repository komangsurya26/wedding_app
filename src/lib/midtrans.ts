import crypto from "crypto";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";


export function verifySignature({ order_id, status_code, gross_amount, signature_key }: any) {
    const payload = `${order_id}${status_code}${gross_amount}${MIDTRANS_SERVER_KEY}`;
    const expected = crypto.createHash("sha512").update(payload).digest("hex");
    // timing-safe compare
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(String(signature_key), "hex"));
}