
export type TrialProps = {
    template_id: number,
    invitation_name: string,
    invitation_url: string,
    slug: string
}

export type PaymentProps = {
    template_id: number;
    invitation_id: number | null;
    url_invitation: string;
    title_invitation: string;
};

export type MidtransItemProps = {
    id: string;
    price: number;
    quantity: number;
    name: string;
}

export type MidtransCustomerProps = {
    id: string;
    first_name: string;
    email: string;
};