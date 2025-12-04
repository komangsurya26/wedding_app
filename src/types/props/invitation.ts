export type Groom = {
    full_name: string
    short_name: string
    child_order: string
    instagram: string
    father: string
    mother: string
}

export type Bride = {
    full_name: string
    short_name: string
    child_order: string
    instagram: string
    father: string
    mother: string
}

export type PhotoProps = {
    image_url: string
    public_id: string
}

export type Photos = {
    photo_brides: string[]
    photo_grooms: string[]
    photo_landscapes: string[]
    photo_portraits: string[]
}

export type Gifts = {
    bank_name: string
    account_number: string
    owner: string
    logo: string
}

export type Events = {
    title: string
    date: string
    start_time: string
    end_time: string
    venue: string
    location_url: string
}

export type Countdown = {
    date: string
    time: string
}

export type Video = {
    id_video_youtube?: string
}

export type Audio = {
    music_url?: string
    music_code?: string
    music_title?: string
}

export type Invitation = {
    templateId?: number | string; //invitationId atau templateId
    invitationId?: number | string;
    urlInvitation?: string
    urlTemplate?: string
    name?: string;
    description?: string;
    type?: 'wedding' | 'metatah';
    image?: string;
    photos?: Photos;
    video?: Video
    groom?: Groom
    bride?: Bride
    gifts?: Gifts[]
    events?: Events[]
    countdown?: Countdown
    audio?: Audio
    expired?: boolean;
};

export type InvitationProps = {
    mode?: "all" | "mine";
    invitations: Invitation[] | [];
};