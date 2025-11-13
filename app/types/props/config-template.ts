export type Images = {
    bride: string;
    groom: string;
    couple: string[];
    potrait: string[];
    landscape: string[];
}

export interface ConfigTemplate {
    templateId: number;
    videoSrc: string;
    videoIdYoutube: string;
    images: Images;
}