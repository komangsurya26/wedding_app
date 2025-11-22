import { useState, useRef } from 'react'
import { deleteImage, getSignature } from '../lib/cloudinary'

type PhotoState = {
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

    const inputRefs = useRef<Record<number, HTMLInputElement | null>>({})


    function initSlots(count = 1) {
        setPhotos((prev) => {
            if (prev.length >= count) return prev
            return Array.from({ length: count }).map((_, i) => prev[i] ?? { file: null, preview: null, url: null, public_id: null, uploading: false })
        })
    }


    async function uploadFileSigned(file: File, index: number, invitationId: number) {

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
        setPhotos((prev) => { const next = [...prev]; next[index] = { file, preview: URL.createObjectURL(file), url: data.secure_url, public_id: data.public_id, uploading: false, saved: false }; return next })
        return data
    }


    async function replaceFile(file: File, index: number, invitationId: number) {
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
                next[index] = { file: null, preview: null, url: null, public_id: null, uploading: false, removing: false };
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
    }


    async function remove(index: number) {
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
                next[index] = { file: null, preview: null, url: null, public_id: null, uploading: false, removing: false };
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
    }


    function bindInput(ref: HTMLInputElement | null, index: number) { inputRefs.current[index] = ref }
    function trigger(index: number) { inputRefs.current[index]?.click() }

    function hasUnsaved() {
        return photos.some(p => p?.public_id && !p?.saved);
    }

    return { photos, initSlots, uploadFileSigned, replaceFile, remove, bindInput, trigger, setPhotos, hasUnsaved }
}