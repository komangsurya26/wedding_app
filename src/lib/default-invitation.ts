import { Invitation } from "@/src/types";

export const DEFAULT_INVITATIONS: Invitation[] = [
    {
        templateId: 1,
        video: {
            id_video_youtube: "6FYtKVFik_8"
        },
        photos: {
            photo_grooms: [
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1765018777/invitations/18/xc9tkqj9c2yzwn3vufnn.webp",
            ],
            photo_brides: [
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1765018847/invitations/18/mckwmzjcbrxuieszvzok.webp",
            ],
            photo_landscapes: [
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998070/ERY_6912-cetak-scaled_jzccvd.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998070/ERY_6912-cetak-scaled_jzccvd.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998070/ERY_6912-cetak-scaled_jzccvd.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998070/ERY_6912-cetak-scaled_jzccvd.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998070/ERY_6912-cetak-scaled_jzccvd.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998070/ERY_6912-cetak-scaled_jzccvd.webp",
            ],
            photo_portraits: [
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
                "https://res.cloudinary.com/dpij7jkkd/image/upload/v1763998051/ERY_7023-scaled_s7l4np.webp",
            ]
        },
        audio: {
            music_url: ""
        },
        groom: {
            full_name: "I Komang Agus Surya Sedana",
            short_name: "Komang",
            child_order: "Pertama",
            father: "I Made Sudiarta",
            mother: "Ni Nengah Karmini",
            instagram: "komangsurya_26",
        },
        bride: {
            full_name: "Ni Nyoman Erny Sari Dewi",
            short_name: "Erny",
            child_order: "Kedua",
            father: "I Wayan Suryadarma",
            mother: "Ni Made Sri Astiti",
            instagram: "ernysari_dewi",
        },
        countdown: {
            date: "2025-12-20T16:02:00",
            time: "16:02:00"
        },
        events: [
            {
                date: "Selasa, 2 Desember 2025",
                end_time: "16:00 WITA",
                location_url: "https://komangsuryasedana.web.id",
                start_time: "07.00 WITA",
                title: "Resepsi",
                venue: "Mall Bali Galeria",
            }
        ],
        gifts: [
            {
                account_number: "023456789",
                bank_name: "BNI",
                logo: "https://res.cloudinary.com/dpij7jkkd/image/upload/v1764136672/banks/bni_zswvuk.png",
                owner: "I Komang Agus Surya Sedana",
            },
            {
                account_number: "243242342",
                bank_name: "BCA",
                logo: "https://res.cloudinary.com/dpij7jkkd/image/upload/v1764136672/banks/bca_ls9vum.png",
                owner: "Ni Nyoman Erny Sari Dewi",
            }
        ],
    },
];
