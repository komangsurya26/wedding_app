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
    images: string[];
}
export interface WeddingGiftProps {
    accounts: Account[];
}

