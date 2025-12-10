"use client";

import React, { useState } from "react";

import { ImageUploadField } from "@/app/dashboard/components/ImageUploadField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { createPhotos } from "@/actions/photos-actions";
import { Spinner } from "@/components/ui/spinner";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { usePhotosGrid, usePortraitLandscape } from "@/hooks/use-photos";
import { Skeleton } from "@/components/ui/skeleton";

export function FotoEdit({
  invitationId,
  uploader,
  onClose,
}: {
  invitationId: number;
  uploader: ReturnType<typeof useImageUploader>;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const {
    portraits,
    landscapes,
    loading: loadingPhotos,
  } = usePortraitLandscape(invitationId);

  usePhotosGrid({ uploader, portraits, landscapes, initSlot: 10 });

  // pembagian sederhana: index genap -> portrait, ganjil -> landscape
  const portraitPhotos = uploader.photos.filter((_, i) => i % 2 === 0);
  const landscapePhotos = uploader.photos.filter((_, i) => i % 2 === 1);

  async function handleSubmit(orientation: "portrait" | "landscape") {
    try {
      setLoading(true);
      const photos =
        orientation === "portrait" ? portraitPhotos : landscapePhotos;

      const payload = {
        orientation,
        invitation_id: invitationId,
        photos: photos.map((p) => ({
          image_url: p.url ?? "",
          public_id: p.public_id ?? "",
        })),
      };
      await createPhotos(payload);

      uploader.setPhotos((prev) =>
        prev.map((p, i) => {
          const isTarget =
            (orientation === "portrait" && i % 2 === 0) ||
            (orientation === "landscape" && i % 2 === 1);

          return isTarget ? { ...p, saved: true } : p;
        })
      );

      setLoading(false);
      toast.success(`Foto ${orientation} berhasil disimpan`);
    } catch (error) {
      setLoading(false);
      toast.error(`Foto ${orientation}  gagal disimpan`);
    }
  }

  if (loadingPhotos) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="portrait">
      <TabsList>
        <TabsTrigger value="portrait">
          Portrait ({portraitPhotos.length})
        </TabsTrigger>
        <TabsTrigger value="landscape">
          Landscape ({landscapePhotos.length})
        </TabsTrigger>
      </TabsList>

      {/* Potraits Tab */}
      <TabsContent
        value="portrait"
        className="pr-3 pt-2 overflow-y-auto max-h-[55vh] hide-scrollbar"
      >
        <div className="grid grid-cols-2 gap-4">
          {portraitPhotos.map((p, idx) => {
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
      </TabsContent>

      {/* Landscape Tab */}
      <TabsContent
        value="landscape"
        className="pr-3 pt-2 overflow-y-auto max-h-[55vh] hide-scrollbar"
      >
        <div className="grid grid-cols-2 gap-4">
          {landscapePhotos.map((p, idx) => {
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
      </TabsContent>

      {/* Footer */}
      <TabsContent value="portrait">
        <DialogFooter className="pt-3 pr-3">
          <Button
            type="button"
            onClick={() => handleSubmit("portrait")}
            disabled={loading}
          >
            <div className="flex items-center gap-2">
              Simpan Potrait
              {loading && <Spinner className="size-4" />}
            </div>
          </Button>
        </DialogFooter>
      </TabsContent>
      <TabsContent value="landscape">
        <DialogFooter className="pt-3 pr-3">
          <Button
            type="button"
            onClick={() => handleSubmit("landscape")}
            disabled={loading}
          >
            <div className="flex items-center gap-2">
              Simpan Landscape
              {loading && <Spinner className="size-4" />}
            </div>
          </Button>
        </DialogFooter>
      </TabsContent>
    </Tabs>
  );
}
