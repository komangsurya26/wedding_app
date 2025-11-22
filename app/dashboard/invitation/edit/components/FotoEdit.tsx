"use client";

import React, { useEffect } from "react";

import { ImageUploadField } from "@/app/dashboard/components/ImageUploadField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function FotoEdit({
  invitationId,
  uploader,
}: {
  invitationId: number;
  uploader: ReturnType<
    typeof import("@/src/hooks/use-image-uploader").useImageUploader
  >;
}) {
  useEffect(() => {
    uploader.initSlots(20);
    return () => uploader.setPhotos([]);
  }, []);

  // pembagian sederhana: index genap -> portrait, ganjil -> landscape
  const portraitPhotos = uploader.photos.filter((_, i) => i % 2 === 0);
  const landscapePhotos = uploader.photos.filter((_, i) => i % 2 === 1);

  async function handleSubmit(orientation: "portrait" | "landscape") {
    try {
      const photos =
        orientation === "portrait" ? portraitPhotos : landscapePhotos;

      const payload = {
        orientation,
        photos: photos.map((p) => ({
          url: p.url ?? null,
          public_id: p.public_id ?? null,
        })),
      };
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Tabs defaultValue="portrait">
      <div className="pb-3">
        <TabsList>
          <TabsTrigger value="portrait">
            Portrait ({portraitPhotos.length})
          </TabsTrigger>
          <TabsTrigger value="landscape">
            Landscape ({landscapePhotos.length})
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Potraits Tab */}
      <div className="overflow-y-auto max-h-[55vh]">
        <TabsContent value="portrait" className="pr-3">
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
      </div>

      {/* Landscape Tab */}
      <div className="overflow-y-auto max-h-[55vh]">
        <TabsContent value="landscape" className="pr-3">
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
      </div>

      {/* Footer */}
      <TabsContent value="portrait">
        <DialogFooter className="pt-3 pr-3">
          <Button type="button" onClick={() => handleSubmit("portrait")}>
            Save changes
          </Button>
        </DialogFooter>
      </TabsContent>
      <TabsContent value="landscape">
        <DialogFooter className="pt-3 pr-3">
          <Button type="button" onClick={() => handleSubmit("landscape")}>
            Save changes
          </Button>
        </DialogFooter>
      </TabsContent>
    </Tabs>
  );
}
