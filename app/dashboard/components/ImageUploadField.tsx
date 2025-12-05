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
  const p = uploader.photos[index];

  async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const f = input.files?.[0];
    if (!f) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(f.type)) {
      toast.warning("Format file harus JPG, PNG, atau WebP.");
      input.value = "";
      return;
    }

    if (f.size > 1 * 1024 * 1024) {
      toast.warning("Ukuran file maksimal 1 MB");
      input.value = "";
      return;
    }

    if (p?.public_id)
      uploader.replaceFile(f, index, invitationId).catch(() => {
        toast.error("Ganti foto gagal, silakan coba lagi.");
      });
    else
      uploader.uploadFileSigned(f, index, invitationId).catch(() => {
        toast.error("Upload foto gagal, silakan coba lagi.");
      });
  }

  return (
    <div className="border rounded p-3 flex flex-col items-center">
      <input
        ref={(el) => uploader.bindInput(el, index)}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
      <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
        {p?.preview ? (
          <Image
            src={p.preview}
            alt={`preview-${index}`}
            width={257}
            height={160}
            className="object-contain w-full h-full"
          />
        ) : p?.url ? (
          <Image
            src={p.url}
            alt={`photo-${index}`}
            width={257}
            height={160}
            className="object-contain w-full h-full"
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
          onClick={() => uploader.trigger(index)}
          disabled={p?.uploading || p?.removing}
        >
          {p?.url || p?.preview ? "Ganti Foto" : "Upload Foto"}
          {p?.uploading && <Spinner className="size-4" />}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => uploader.remove(index)}
          disabled={p?.uploading || p?.removing || (!p?.url && !p?.preview)}
        >
          Hapus
          {p?.removing && <Spinner className="size-4" />}
        </Button>
        {!p?.uploading && p?.url && (
          <Button variant={"outline"} asChild>
            <a href={p?.url} target="_blank" rel="noopener noreferrer">
              Lihat
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
