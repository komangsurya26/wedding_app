"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useImageUploader } from "@/src/hooks/use-image-uploader";

export function ImageUploadField({
  index,
  uploader,
  invitationId,
}: {
  index: number;
  uploader: ReturnType<typeof useImageUploader>;
  invitationId: number;
}) {
  const photo = uploader.photos[index];
  const ref = React.useRef<Record<number, HTMLInputElement | null>>({});

  async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // validasi file size
    if (file.size > 1 * 1024 * 1024) {
      toast.error("Foto tidak boleh lebih dari 1MB");
      return;
    }

    // validasi file type
    if (!file.type.startsWith("image/")) {
      toast.error("Foto harus berupa gambar");
      return;
    }

    if (photo?.public_id)
      uploader.replaceFile(file, index, invitationId).catch(() => {
        toast.error("Ganti foto gagal, silakan coba lagi.");
      });
    else
      uploader.uploadFileSigned(file, index, invitationId).catch(() => {
        toast.error("Upload foto gagal, silakan coba lagi.");
      });
  }

  return (
    <div className="border rounded p-3 flex flex-col items-center">
      <input
        ref={(el) => {
          ref.current[index] = el;
        }}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
      <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
        {photo?.preview ? (
          <Image
            src={photo.preview}
            alt={`preview-${index}`}
            width={400}
            height={300}
            className="object-contain w-full h-full"
            priority
          />
        ) : photo?.url ? (
          <Image
            src={photo.url}
            alt={`photo-${index}`}
            width={400}
            height={300}
            className="object-contain w-full h-full"
            priority
          />
        ) : (
          <div className="text-center text-sm text-gray-500">
            Belum ada foto
          </div>
        )}
      </div>
      <div className="w-full mt-3 flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          onClick={() => ref.current[index]?.click()}
          disabled={photo?.uploading || photo?.removing}
        >
          {photo?.url || photo?.preview ? "Ganti Foto" : "Upload Foto"}
          {photo?.uploading && <Spinner className="size-4" />}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => uploader.remove(index)}
          disabled={
            photo?.uploading ||
            photo?.removing ||
            (!photo?.url && !photo?.preview)
          }
        >
          Hapus
          {photo?.removing && <Spinner className="size-4" />}
        </Button>
        {!photo?.uploading && photo?.url && (
          <Button variant={"outline"} asChild>
            <a href={photo?.url} target="_blank" rel="noopener noreferrer">
              Lihat
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
