export type Order = {
    id: number
    order_ref: string
    amount: number
    title_invitation: string
    url_invitation: string
    url_payment: string
    status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'EXPIRED' | 'WAITING_PAYMENT'
    created_at: string
    expires_at: string
    paid_at: string
};