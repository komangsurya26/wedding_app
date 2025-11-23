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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const EventSchema = z.object({
  fullName: z.string().min(1, "Nama wajib diisi"),
  shortName: z.string().min(1, "Nama wajib diisi"),
});

type FormValues = z.infer<typeof EventSchema>;

export function EventEdit({
  invitationId,
  onClose,
}: {
  invitationId: number;
  onClose: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      fullName: "",
      shortName: "",
    },
    mode: "onTouched",
  });
  
  async function onSubmit(values: FormValues) {
    try {
      const payload = {
        invitationId,
        fullName: values.fullName,
        shortName: values.shortName,
      };

      toast.success("Input Data Sukses");
    } catch (error) {
      toast.error("Gagal Input Data");
    }
  }

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
                      <Input id="fullName" placeholder="" {...field} />
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
                      <Input id="shortName" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
