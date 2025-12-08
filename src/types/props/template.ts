export type Template = {
    id: number
    name: string
    type: TemplateType
    img: string
    price: number
    href: string
    description: string
};


export enum TemplateType {
    BASIC = "basic",
    PREMIUM = "premium",
    VIP = "vip",
}