"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageUploadField } from "@/app/dashboard/components/ImageUploadField";
import { createGroom } from "@/src/lib/groom-actions";
import { GroomSchema, GroomSchemaType } from "@/src/schemas/groom.schema";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useGroom } from "@/src/hooks/use-groom";
import { Skeleton } from "@/components/ui/skeleton";
import GroomForm from "./GroomForm";
import { usePhotoGroom, usePhotosLinear } from "@/src/hooks/use-photos";
import { useImageUploader } from "@/src/hooks/use-image-uploader";

export function GroomEdit({
  invitationId,
  type,
  uploader,
  onClose,
}: {
  invitationId: number;
  type: "groom" | "bride";
  uploader: ReturnType<typeof useImageUploader>;
  onClose: () => void;
}) {
  const { groom, loading: loadingGroom } = useGroom(invitationId, type);
  const { photoGrooms, loading: loadingPhoto } = usePhotoGroom(
    invitationId,
    type
  );
  usePhotosLinear({ uploader, photos: photoGrooms, initSlot: 2 });

  const form = useForm<GroomSchemaType>({
    resolver: zodResolver(GroomSchema),
    defaultValues: {
      full_name: "",
      short_name: "",
      child_order: "",
      instagram: "",
      father: "",
      mother: "",
    },
    mode: "onBlur",
  });

  const { setValue } = form;

  async function onSubmit(values: GroomSchemaType) {
    try {
      const payload = {
        type,
        invitation_id: invitationId,
        ...values,
        photos: uploader.photos.map((p) => ({
          image_url: p.url ?? "",
          public_id: p.public_id ?? "",
        })),
      };

      await createGroom(payload);
      toast.success("Mempelai berhasil disimpan");
      onClose();
    } catch (error) {
      toast.error("Mempelai gagal disimpan");
    }
  }

  useEffect(() => {
    if (!groom) return;
    setValue("full_name", groom.full_name ?? "");
    setValue("short_name", groom.short_name ?? "");
    setValue("child_order", groom.child_order ?? "");
    setValue("instagram", groom.instagram ?? "");
    setValue("father", groom.father ?? "");
    setValue("mother", groom.mother ?? "");
  }, [groom, setValue]);

  const isLoading = loadingGroom || loadingPhoto;
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col max-h-[55vh]">
          <div className="flex-1 overflow-y-auto pr-3 pb-5 pt-2">
            <div className="space-y-4">
              <GroomForm form={form} type={type} />
              <div className="grid grid-cols-2 gap-4">
                {uploader.photos.map((p, idx) => {
                  const originalIndex = uploader.photos.indexOf(p);
                  return (
                    <ImageUploadField
                      key={originalIndex}
                      index={originalIndex}
                      uploader={uploader}
                      invitationId={invitationId}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter className="pr-3 pt-3">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Menyimpan..." : "Save"}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
