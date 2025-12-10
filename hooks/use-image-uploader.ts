"use client";

import { useState, useCallback } from 'react'
import { deleteImage, getSignature } from '../services/cloudinary'

export type PhotoState = {
    file?: File | null
    preview?: string | null
    url?: string | null
    public_id?: string | null
    uploading?: boolean
    removing?: boolean
    saved?: boolean
}


export function useImageUploader({ cloudName }: { cloudName: string; }) {
    const [photos, setPhotos] = useState<PhotoState[]>([])
    const [initialPhotos, setInitialPhotos] = useState<PhotoState[]>([]);

    const initPhotos = useCallback((initialData: PhotoState[]) => {
        const filled = [
            ...initialData,
        ];
        setPhotos(filled);
        setInitialPhotos(filled.map((p) => ({ ...p }))); // untuk set photos awal pertama fetch dari databse
    }, []);


    const uploadFileSigned = useCallback(async (file: File, index: number, invitationId: number) => {

        setPhotos((prev) => { const next = [...prev]; next[index] = { ...next[index], uploading: true }; return next })

        // get signature
        const sig = await getSignature(invitationId)

        const form = new FormData()
        form.append('file', file)
        form.append('api_key', `${sig.api_key}`)
        form.append('timestamp', String(sig.timestamp))
        form.append('signature', sig.signature)
        form.append('folder', `invitations/${invitationId || 'general'}`)


        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: form })
        if (!res.ok) {
            setPhotos((prev) => { const next = [...prev]; next[index] = { ...next[index], uploading: false }; return next })
            throw new Error('Upload to Cloudinary failed')
        }


        const data = await res.json()
        setPhotos((prev) => {
            const next = [...prev]; next[index] = {
                file,
                preview: URL.createObjectURL(file),
                url: data.secure_url,
                public_id: data.public_id,
                uploading: false,
            };
            return next
        })
        return data
    }, [cloudName]);


    const replaceFile = useCallback(async (file: File, index: number, invitationId: number) => {
        try {
            setPhotos(prev => {
                const next = [...prev];
                next[index].removing = true;
                return next;
            });
            const existing = photos[index]

            if (existing?.public_id) {
                const publicId = existing.public_id
                await deleteImage(publicId)
            }

            setPhotos((prev) => {
                const next = [...prev];
                if (next[index]?.preview) URL.revokeObjectURL(next[index]!.preview!);
                next[index] = {
                    file: null,
                    preview: null,
                    url: null,
                    public_id: null,
                    uploading: false,
                    removing: false
                };
                return next
            })

            return uploadFileSigned(file, index, invitationId)
        } catch (error) {
            setPhotos(prev => {
                const next = [...prev];
                next[index].removing = false;
                return next;
            });
            throw error;
        }
    }, [photos, uploadFileSigned]);


    const remove = useCallback(async (index: number) => {
        try {
            setPhotos(prev => {
                const next = [...prev];
                next[index].removing = true;
                return next;
            });

            const existing = photos[index]

            if (existing?.public_id) {
                const publicId = existing.public_id
                await deleteImage(publicId)
            }

            setPhotos((prev) => {
                const next = [...prev];
                if (next[index]?.preview) URL.revokeObjectURL(next[index]!.preview!);
                next[index] = {
                    file: null,
                    preview: null,
                    url: null,
                    public_id: null,
                    uploading: false,
                    removing: false,
                };
                return next
            })
        } catch (error) {
            setPhotos(prev => {
                const next = [...prev];
                next[index].removing = false;
                return next;
            });
            throw error;
        }
    }, [photos]);


    const hasUnsaved = useCallback(() => {
        return photos.some((p, i) => {
            const initial = initialPhotos[i];
            // Jika foto awal ada tapi sekarang dihapus → true
            if (initial?.public_id && !p.public_id && !p.saved) return true;
            if (initial?.public_id && p.public_id && initial?.public_id !== p.public_id && !p.saved) return true;
            // Jika foto baru diupload → true
            if (!initial?.public_id && p.public_id && !p.saved) return true;

            return false;
        });
    }, [photos, initialPhotos]);

    const hasUnsavedPortrait = useCallback(() => {
        return photos.some((p, i) => {
            const initial = initialPhotos[i];
            const isDirty = (
                (initial?.public_id && !p.public_id && !p.saved) ||
                (initial?.public_id && p.public_id && initial?.public_id !== p.public_id && !p.saved) ||
                (!initial?.public_id && p.public_id && !p.saved)
            );
            return i % 2 === 0 && isDirty;
        });
    }, [photos, initialPhotos]);

    const hasUnsavedLandscape = useCallback(() => {
        return photos.some((p, i) => {
            const initial = initialPhotos[i];
            const isDirty = (
                (initial?.public_id && !p.public_id && !p.saved) ||
                (initial?.public_id && p.public_id && initial?.public_id !== p.public_id && !p.saved) ||
                (!initial?.public_id && p.public_id && !p.saved)
            );
            return i % 2 === 1 && isDirty;
        });
    }, [photos, initialPhotos]);

    return { photos, hasUnsavedPortrait, hasUnsavedLandscape, initPhotos, uploadFileSigned, replaceFile, remove, setPhotos, hasUnsaved }
}