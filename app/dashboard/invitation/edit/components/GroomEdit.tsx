"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploadField } from "@/app/dashboard/components/ImageUploadField";
import { GroomEditProps } from "@/src/types";
import { createGroomBride } from "@/src/lib/groombride";
import { GroomSchema, GroomSchemaType } from "@/src/schemas/groom.schema";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GroomEdit({
  invitationId,
  type = "groom",
  uploader,
  onClose,
}: GroomEditProps) {
  const groomName = "I Putu Romeo, S.T., M.T.";
  const brideName = "Ni Putu Juliet, S.M";
  const defaultFullName = type === "groom" ? groomName : brideName;
  const defaultShortName = type === "groom" ? "Romeo" : "Juliet";

  const form = useForm<GroomSchemaType>({
    resolver: zodResolver(GroomSchema),
    defaultValues: {
      full_name: "",
      short_name: "",
      child_order: "none",
      instagram: "",
      father: "",
      mother: "",
    },
    mode: "onTouched",
  });

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

      await createGroomBride(payload);
      toast.success("Mempelai berhasil disimpan");
      onClose();
    } catch (error) {
      toast.error("Mempelai gagal disimpan");
    }
  }

  useEffect(() => {
    uploader.initSlots(2);
    return () => uploader.setPhotos([]);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col max-h-[55vh]">
          <div className="flex-1 overflow-y-auto pr-3 pb-5 pt-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="full_name">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        id="full_name"
                        placeholder={defaultFullName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="short_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="short_name">Nama Panggilan</FormLabel>
                    <FormControl>
                      <Input
                        id="short_name"
                        placeholder={defaultShortName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="child_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="child_order">Anak ke berapa</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full text-base font-light">
                          <SelectValue placeholder="Pilih anak ke berapa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="none">
                              Tidak Diketahui
                            </SelectItem>
                            <SelectItem value="Pertama">Pertama</SelectItem>
                            <SelectItem value="Kedua">Kedua</SelectItem>
                            <SelectItem value="Ketiga">Ketiga</SelectItem>
                            <SelectItem value="Keempat">Keempat</SelectItem>
                            <SelectItem value="Kelima">Kelima</SelectItem>
                            <SelectItem value="Keenam">Keenam</SelectItem>
                            <SelectItem value="Ketujuh">Ketujuh</SelectItem>
                            <SelectItem value="Kedelapan">Kedelapan</SelectItem>
                            <SelectItem value="Kesembilan">
                              Kesembilan
                            </SelectItem>
                            <SelectItem value="Kesepuluh">Kesepuluh</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="father"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="father">Nama Bapak</FormLabel>
                    <FormControl>
                      <Input
                        id="father"
                        placeholder="I Wayan Jaya"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mother"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="mother">Nama Ibu</FormLabel>
                    <FormControl>
                      <Input
                        id="mother"
                        placeholder="Ni Nengah Ayu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="instagram">
                      Instagram (Tanpa @)
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="instagram"
                        placeholder="komangsurya_26"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                {uploader.photos.map((_, i) => (
                  <ImageUploadField
                    key={i}
                    index={i}
                    uploader={uploader}
                    invitationId={invitationId}
                  />
                ))}
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
