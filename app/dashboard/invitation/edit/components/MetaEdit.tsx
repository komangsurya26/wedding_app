"use client";

import { createMeta, fetchMeta } from "@/actions/meta-actions";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { MetaSchema, MetaSchemaType } from "@/schemas/meta.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CarouselTutorial } from "./Carousel";

const TUTORIAL_META = [
    "https://res.cloudinary.com/dpij7jkkd/image/upload/v1765372429/tutorial/Gambar_schpoo.png",
    "https://res.cloudinary.com/dpij7jkkd/image/upload/v1765372395/tutorial/Gambar_1_lwzp04.png",
    "https://res.cloudinary.com/dpij7jkkd/image/upload/v1765372334/tutorial/Gambar_2_jymbjg.png"
];

export function MetaEdit({
    invitationId,
    uploader,
    onClose,
}: {
    invitationId: number;
    uploader: ReturnType<typeof useImageUploader>;
    onClose: () => void;
}) {
    const [loading, setLoading] = useState(true);

    const { photos, uploadFileSigned, remove, initPhotos } = uploader;

    const form = useForm<MetaSchemaType>({
        resolver: zodResolver(MetaSchema),
        defaultValues: {
            title: "",
            description: "",
            image_url: "",
            public_id: "",
        },
    });

    const { setValue } = form;

    // Init form values from fetchMeta
    useEffect(() => {
        if (!invitationId) return;

        async function loadMeta() {
            try {
                const data = await fetchMeta({ invitation_id: invitationId });
                if (data) {
                    setValue("title", data.title || "");
                    setValue("description", data.description || "");
                    setValue("image_url", data.image_url || "");
                    setValue("public_id", data.public_id || "");

                    initPhotos([
                        {
                            url: data.image_url ?? "",
                            saved: true,
                            public_id: data.public_id ?? "",
                        },
                    ]);
                }
            } catch (err) {
                toast.error("Gagal memuat metadata");
            } finally {
                setLoading(false);
            }
        }

        loadMeta();
    }, [invitationId, setValue, initPhotos]);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            await uploadFileSigned(file, 0, invitationId);
        } catch (error) {
            toast.error("Gagal mengupload gambar");
        }
    }
    const currentPhoto = photos[0];

    async function onSubmit(values: MetaSchemaType) {
        try {
            await createMeta({
                invitation_id: invitationId,
                title: values.title,
                description: values.description,
                image_url: currentPhoto?.url || "",
                public_id: currentPhoto?.public_id || "",
            });
            toast.success("Metadata berhasil disimpan");
            onClose();
        } catch (error) {
            toast.error("Gagal menyimpan metadata");
        }
    }


    if (loading) {
        return (
            <div className="flex flex-col space-y-4 p-4">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
                </div>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col max-h-[55vh]">
                    <div className="overflow-y-auto hide-scrollbar pr-3 pb-5 pt-2 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left: Upload/Preview */}
                            <div className="space-y-2">
                                <FormLabel>Gambar Meta (Thumbnail)</FormLabel>
                                {currentPhoto?.url ? (
                                    <div className="relative aspect-video w-full h-[300px] overflow-hidden rounded-md border bg-muted group">
                                        <Image
                                            src={currentPhoto.url}
                                            alt="Meta Image"
                                            fill
                                            className="object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size={uploader.photos[0]?.removing ? "sm" : "icon"}
                                            className={`absolute top-2 right-2 ${uploader.photos[0]?.removing ? "w-auto px-3" : "size-8"} opacity-100`}
                                            onClick={() => remove(0)}
                                            disabled={uploader.photos[0]?.removing}
                                        >
                                            {uploader.photos[0]?.removing ? (
                                                <>Hapus... <Loader2 className="animate-spin ml-2 size-4" /></>
                                            ) : (
                                                <X className="size-4" />
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="dropzone-file"
                                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                {currentPhoto?.uploading ? (
                                                    <Loader2 className="w-8 h-8 mb-4 text-gray-500 animate-spin" />
                                                ) : (
                                                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                                )}
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Klik untuk upload</span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PNG, JPG or WEBP
                                                </p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={currentPhoto?.uploading}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <FormLabel>Kegunaan Data Meta</FormLabel>
                                {/* Right: Dummy Slider */}
                                <CarouselTutorial
                                    images={TUTORIAL_META}
                                />
                            </div>
                        </div>



                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul Meta</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Undangan Pawiwahan | Komang dan Dewi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi Meta</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Contoh: Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter className="pr-3 pt-3">
                        <Button type="submit" disabled={form.formState.isSubmitting || currentPhoto?.uploading}>
                            {form.formState.isSubmitting ? "Menyimpan..." : "Simpan Meta"}
                        </Button>
                    </DialogFooter>
                </div>
            </form>
        </Form>
    );
}