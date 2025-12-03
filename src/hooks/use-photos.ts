import { useEffect, useState } from "react";
import { fecthPhotos, fetchPhotoGrooms } from "../lib/photos-actions";
import { PhotoProps } from "../types";
import { useImageUploader } from "./use-image-uploader";

export function usePhotoGroom(invitationId: number, type: 'groom' | 'bride') {
    const [loading, setLoading] = useState(false);
    const [photoGrooms, setPhotoGrooms] = useState<PhotoProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!invitationId) return;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPhotoGrooms({ invitation_id: invitationId, type });
                setPhotoGrooms(data);
            } catch (err) {
                setError("Gagal memuat groom");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [invitationId, type]);

    return { photoGrooms, loading, error };
}

export function usePortraitLandscape(invitationId: number) {
    const [loading, setLoading] = useState(false);
    const [portraits, setPortraits] = useState<PhotoProps[]>([]);
    const [landscapes, setLandscapes] = useState<PhotoProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!invitationId) return;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const portrait = await fecthPhotos({ invitation_id: invitationId, orientation: "portrait" });
                const landscape = await fecthPhotos({ invitation_id: invitationId, orientation: "landscape" });
                setPortraits(portrait)
                setLandscapes(landscape)
            } catch (err) {
                setError("Gagal memuat groom");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [invitationId]);

    return { landscapes, portraits, loading, error };
}

export function usePhotosGrid({
    uploader,
    portraits,
    landscapes,
    initSlot,
}: {
    uploader: ReturnType<typeof useImageUploader>;
    portraits?: PhotoProps[];
    landscapes?: PhotoProps[];
    initSlot: number;
}) {
    useEffect(() => {
        // buat array placeholder sesuai initSlot
        const filled = Array.from({ length: initSlot }).map(() => ({
            url: "",
            public_id: "",
        }));

        // masukkan portrait ke index genap
        if (portraits) {
            portraits.forEach((p, i) => {
                const idx = i * 2;
                if (idx < initSlot) {
                    filled[idx] = {
                        url: p.image_url ?? "",
                        public_id: p.public_id ?? "",
                    };
                }
            });
        }

        // masukkan landscape ke index ganjil
        if (landscapes) {
            landscapes.forEach((p, i) => {
                const idx = i * 2 + 1;
                if (idx < initSlot) {
                    filled[idx] = {
                        url: p.image_url ?? "",
                        public_id: p.public_id ?? "",
                    };
                }
            });
        }

        // set ke uploader
        uploader.initPhotos(filled);

        // cleanup saat unmount
        return () => uploader.setPhotos([]);
    }, [portraits, landscapes, initSlot]);
}

export function usePhotosLinear({
    uploader,
    photos,
    initSlot,
}: {
    uploader: ReturnType<typeof useImageUploader>;
    photos: PhotoProps[];
    initSlot: number;
}) {
    useEffect(() => {
        const filled = Array.from({ length: initSlot }).map(() => ({
            url: "",
            public_id: "",
        }));

        photos.forEach((p, i) => {
            if (i < initSlot) {
                filled[i] = {
                    url: p.image_url ?? "",
                    public_id: p.public_id ?? "",
                };
            }
        });

        uploader.initPhotos(filled);

        return () => uploader.setPhotos([]);
    }, [photos, initSlot]);
}

