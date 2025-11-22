type EventItem = {
    id: string | number;
    title: string;
    date: string;
    time: string;
    venue: string;
    locationUrl: string;
};

type Account = {
    bankName: string;
    accountNumber: string;
    owner: string;
    logo: string;
};

export interface WeddingDayProps {
    events: EventItem[];
}
export interface WeddingGiftProps {
    accounts: Account[];
}

