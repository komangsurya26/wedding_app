import { Invitation } from "@/src/types";

export const DEFAULT_INVITATIONS: Invitation[] = [
    {
        templateId: 1,
        
        id_video_youtube: "6FYtKVFik_8",
        photos: {
            photo_brides: [
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
            ],
            photo_grooms: [
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
            ],
            photo_landscapes: [
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998070/ERY_6912-cetak-scaled_jzccvd.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998052/ERY_6518-scaled_agxy3o.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998070/ERY_6912-cetak-scaled_jzccvd.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998052/ERY_6518-scaled_agxy3o.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998070/ERY_6912-cetak-scaled_jzccvd.webp",
            ],
            photo_portraits: [
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_6810-scaled_hyxume.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_6810-scaled_hyxume.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
            ]
        },
        audio: {
            music_url: ""
        },
        bride: {
            child_order: "",
            father: "",
            mother: "",
            full_name: "",
            instagram: "",
            short_name: "",
        },
        groom: {
            child_order: "",
            father: "",
            mother: "",
            full_name: "",
            instagram: "",
            short_name: "",
        },
        countdown: {
            date: ""
        },
        events: [
            {
                date: "",
                end_time: "",
                location_url: "",
                start_time: "",
                title: "",
                venue: "",
            }
        ],
        gifts: [
            {
                account_number: "",
                bank_name: "",
                logo: "",
                owner: "",
            }
        ],
    },
];
