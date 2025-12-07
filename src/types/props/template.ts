export type Template = {
    id: number
    name: string
    type: InvitationType
    img: string
    price: number
    href: string
    description: string
};


export enum InvitationType {
    BASIC = "basic",
    PREMIUM = "premium",
    VIP = "vip",
}