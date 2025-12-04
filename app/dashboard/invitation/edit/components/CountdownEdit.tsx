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
import { useCountdown } from "@/src/hooks/use-countdown";
import { createCountdown } from "@/src/lib/countdown-actions";
import {
  CountdownSchema,
  CountdownSchemaType,
} from "@/src/schemas/countdown.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function CountdownEdit({
  invitationId,
  onClose,
}: {
  invitationId: number;
  onClose: () => void;
}) {
  const { countdown, loading } = useCountdown(invitationId);

  const form = useForm<CountdownSchemaType>({
    resolver: zodResolver(CountdownSchema),
    defaultValues: {
      date: "",
      time: "",
    },
    mode: "onBlur",
  });
  const { handleSubmit, control, formState, setValue } = form;

  useEffect(() => {
    if (!countdown) return;
    setValue("date", countdown.date ?? "");
    setValue("time", countdown.time ?? "");
  }, [countdown, setValue]);

  const onSubmit = async (values: CountdownSchemaType) => {
    try {
      const payload = {
        invitation_id: invitationId,
        date: values.date,
        time: values.time,
      };
      await createCountdown(payload);
      toast.success("Countdown berhasil disimpan");
      onClose();
    } catch (error) {
      toast.error("Gagal menyimpan countdown");
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex-1 pr-3 pb-5 pt-2 space-y-6">
            <div className="space-y-4">
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Hitung Mundur</FormLabel>
                    <FormControl>
                      <Input id="date" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Hitung Mundur</FormLabel>
                    <FormControl>
                      <Input id="time" type="time" {...field} />
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
                {formState.isSubmitting ? "Menyimpan..." : "Save"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </form>
    </Form>
  );
}
