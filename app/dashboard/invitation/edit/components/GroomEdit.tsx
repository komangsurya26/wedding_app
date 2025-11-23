"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploadField } from "@/app/dashboard/components/ImageUploadField";
import { GroomEditProps } from "@/src/types";
import { createGroomBride } from "@/src/lib/groombride";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GroomSchema = z.object({
  fullName: z.string().min(1, "Nama wajib diisi"),
  shortName: z.string().min(1, "Nama wajib diisi"),
  childOrder: z.string().optional(),
  instagram: z.string().optional(),
  father: z.string().optional(),
  mother: z.string().optional(),
});

type FormValues = z.infer<typeof GroomSchema>;


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
  
  const form = useForm<FormValues>({
    resolver: zodResolver(GroomSchema),
    defaultValues: {
      fullName: "",
      shortName: "",
      childOrder: "none",
      instagram: "",
      father: "",
      mother: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: FormValues) {
    try {
      const payload = {
        type,
        invitationId,
        fullName: values.fullName,
        shortName: values.shortName,
        childOrder: values.childOrder,
        father: values.father,
        mother: values.mother,
        instagram: values.instagram,
        photos: uploader.photos.map((p) => ({
          image_url: p.url ?? "",
          public_id: p.public_id ?? "",
        })),
      };

      await createGroomBride(payload);
      toast.success("Input Data Sukses");
      onClose?.();
    } catch (error) {
      toast.error("Gagal Input Data");
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fullName">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        id="fullName"
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
                name="shortName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="shortName">Nama Panggilan</FormLabel>
                    <FormControl>
                      <Input
                        id="shortName"
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
                name="childOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="childOrder">Anak ke berapa</FormLabel>
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
              {form.formState.isSubmitting ? "Menyimpan..." : "Save changes"}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
