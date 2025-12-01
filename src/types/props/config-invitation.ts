export type Images = {
    bride: string;
    groom: string;
    couple: string[];
    portrait: string[];
    landscape: string[];
}

export interface ConfigInvitation {
    templateId: number;
    videoSrc: string;
    videoIdYoutube: string;
    images: Images;
}