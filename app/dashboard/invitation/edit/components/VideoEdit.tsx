"use client";

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
import { useVideo } from "@/hooks/use-video";
import { createVideoYoutube } from "@/actions/video-actions";
import { VideoSchema, VideoSchemaType } from "@/schemas/video.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function VideoEdit({
  invitationId,
  onClose,
}: {
  invitationId: number;
  onClose: () => void;
}) {
  const { video, loading } = useVideo(invitationId);
  const form = useForm<VideoSchemaType>({
    resolver: zodResolver(VideoSchema),
    defaultValues: {
      id_video_youtube: "",
    },
    mode: "onBlur",
  });

  const { handleSubmit, formState, setValue } = form;
  useEffect(() => {
    if (!video) return;
    setValue("id_video_youtube", video.id_video_youtube ?? "");
  }, [video, setValue]);

  async function onSubmit(values: VideoSchemaType) {
    try {
      const payload = {
        invitation_id: invitationId,
        id_video_youtube: values.id_video_youtube,
      };
      await createVideoYoutube(payload);
      toast.success("Video berhasil disimpan");
      onClose();
    } catch (error) {
      toast.error("Gagal menyimpan video");
    }
  }

  if (loading) return <Skeleton className="h-10 w-full" />;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex-1 pr-3 pb-5 pt-2 space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="id_video_youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Id Video Youtube</FormLabel>
                    <FormControl>
                      <Input
                        id="id_video_youtube"
                        placeholder="J1HAyer_I8U"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pr-3 pt-3">
            <div />
            <DialogFooter>
              <Button type="submit" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? "Menyimpan..." : "Simpan Video"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </form>
    </Form>
  );
}
