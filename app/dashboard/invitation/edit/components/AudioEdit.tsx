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
import { useAudio } from "@/src/hooks/use-audio";
import { createAudio } from "@/src/lib/audio-actions";
import { MUSICS } from "@/src/lib/musics-datas";
import { MusicSchema, MusicSchemaType } from "@/src/schemas/music.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AudioSelect } from "./AudioSelect";
import { Skeleton } from "@/components/ui/skeleton";

export function AudioEdit({
  invitationId,
  onClose,
}: {
  invitationId: number;
  onClose: () => void;
}) {
  const defaultMusic = MUSICS[0];

  const { audio, loading } = useAudio(invitationId);

  const form = useForm<MusicSchemaType>({
    resolver: zodResolver(MusicSchema),
    defaultValues: {
      music_code: defaultMusic.code,
      music_title: defaultMusic.title,
      music_url: defaultMusic.url,
    },
    mode: "onBlur",
  });

  const { handleSubmit, setValue, register, formState, watch, reset } = form;

  useEffect(() => {
    if (!audio) return;

    reset({
      music_code: audio.music_code,
      music_title: audio.music_title,
      music_url: audio.music_url,
    });
  }, [audio, reset]);

  function handleMusicSelect(code: string) {
    const music = MUSICS.find((m) => m.code === code);

    if (music) {
      setValue("music_code", music.code, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("music_title", music.title, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("music_url", music.url, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }

  async function onSubmit(values: MusicSchemaType) {
    try {
      const payload = {
        invitation_id: invitationId,
        music_code: values.music_code,
        music_title: values.music_title,
        music_url: values.music_url,
      };
      await createAudio(payload);
      toast.success("Musik berhasil disimpan");
      onClose();
    } catch (error) {
      toast.error("Gagal menyimpan musik");
    }
  }

  const currentMusicCode = watch("music_code");
  const currentPreviewUrl = watch("music_url");

  if (loading)
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex-1 pr-3 pb-5 pt-2 space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="music_code"
                render={() => (
                  <FormItem>
                    <FormLabel>Pilih Audio</FormLabel>
                    <FormControl>
                      <AudioSelect
                        value={currentMusicCode}
                        onChange={handleMusicSelect}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preview Audio */}
              {currentPreviewUrl && (
                <div className="mt-3">
                  <FormLabel>Preview</FormLabel>
                  <audio
                    className="mt-1 w-full"
                    controls
                    src={currentPreviewUrl}
                  />
                </div>
              )}

              <input type="hidden" {...register("music_title")} />
              <input type="hidden" {...register("music_url")} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pr-3 pt-3">
            <div />
            <DialogFooter>
              <Button type="submit" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? "Menyimpan..." : "Save"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </form>
    </Form>
  );
}
