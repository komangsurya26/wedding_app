"use client";

import React, { useEffect, useState } from "react";

import { ImageUploadField } from "@/app/dashboard/components/ImageUploadField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { createPhotos } from "@/src/lib/photos";
import { Spinner } from "@/components/ui/spinner";

export function FotoEdit({
  invitationId,
  uploader,
  onClose,
}: {
  invitationId: number;
  uploader: ReturnType<
    typeof import("@/src/hooks/use-image-uploader").useImageUploader
  >;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    uploader.initSlots(20);
    return () => uploader.setPhotos([]);
  }, []);

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
      setLoading(false);
      toast.success("Input Data Sukses");
      onClose();
    } catch (error) {
      setLoading(false);
      toast.error("Gagal Input Data");
    }
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
        className="pr-3 pt-2 overflow-y-auto max-h-[55vh]"
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
        className="pr-3 pt-2 overflow-y-auto max-h-[55vh]"
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
              Save Potrait
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
              Save Landscape
              {loading && <Spinner className="size-4" />}
            </div>
          </Button>
        </DialogFooter>
      </TabsContent>
    </Tabs>
  );
}
