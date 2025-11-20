"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  invitationId: string;
  type?: "groom" | "bride" | string;
  onSuccess?: () => void; // optional callback untuk menutup dialog / refresh parent
};

const GroomSchema = z.object({
  groomName: z.string().min(1, "Nama wajib diisi"),
  fatherName: z.string().optional().or(z.literal("")),
  motherName: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof GroomSchema>;

export function GroomEdit({ invitationId, type = "groom", onSuccess }: Props) {
  const defaultGroom =
    type === "groom" ? "I Putu Romeo, S.T., M.T." : "Ni Putu Juliet, S.M";

  const form = useForm<FormValues>({
    resolver: zodResolver(GroomSchema),
    defaultValues: {
      groomName: "",
      fatherName: "",
      motherName: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: FormValues) {
    const payload = {
      invitationId,
      groomName: values.groomName || null,
      fatherName: values.fatherName || null,
      motherName: values.motherName || null,
    };
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="groomName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="groomName">Nama Lengkap</FormLabel>
                <FormControl>
                  <Input id="groomName" placeholder={defaultGroom} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fatherName">Nama Bapak</FormLabel>
                <FormControl>
                  <Input
                    id="fatherName"
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
            name="motherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="motherName">Nama Ibu</FormLabel>
                <FormControl>
                  <Input
                    id="motherName"
                    placeholder="Ni Nengah Ayu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Menyimpan..." : "Save changes"}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
