"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createEvent } from "@/src/lib/event-actions";
import {
  EventsArraySchema,
  EventArraySchemaType,
} from "@/src/schemas/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEvent } from "@/src/hooks/use-event";
import { Skeleton } from "@/components/ui/skeleton";

export function EventEdit({
  invitationId,
  onClose,
}: {
  invitationId: number;
  onClose: () => void;
}) {
  const { events, loading } = useEvent(invitationId);

  const form = useForm<EventArraySchemaType>({
    resolver: zodResolver(EventsArraySchema),
    defaultValues: {
      events: [
        {
          title: "",
          date: "",
          start_time: "",
          end_time: "",
          venue: "",
          location_url: "",
        },
      ],
    },
    mode: "onBlur",
  });

  const { control, handleSubmit, formState, setValue } = form;

  useEffect(() => {
    if (!events) return;
    const map = events.map((event) => ({
      title: event.title,
      date: event.date,
      start_time: event.start_time,
      end_time: event.end_time,
      venue: event.venue,
      location_url: event.location_url,
    }));

    setValue("events", map);
  }, [events, setValue]);

  const { fields, append, remove } = useFieldArray<
    EventArraySchemaType,
    "events"
  >({
    control,
    name: "events",
  });

  async function onSubmit(values: EventArraySchemaType) {
    try {
      const payload = values.events.map((event) => ({
        invitation_id: invitationId,
        ...event,
      }));

      await createEvent(payload);

      toast.success("Acara berhasil disimpan");

      onClose();
    } catch (error) {
      toast.error("Acara gagal disimpan");
    }
  }

  if (loading)
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col max-h-[70vh]">
          <div className="flex-1 overflow-y-auto pr-3 pb-5 pt-2 space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-md shadow-sm relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Acara #{index + 1}</div>
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm"
                      variant="destructive"
                      disabled={formState.isSubmitting}
                    >
                      Hapus
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <FormField
                    control={control}
                    name={`events.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`events-${index}-title`}>
                          Judul
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`events-${index}-title`}
                            placeholder="Resepsi"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`events.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`events-${index}-date`}>
                          Tanggal
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`events-${index}-date`}
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <FormField
                      control={control}
                      name={`events.${index}.start_time`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel htmlFor={`events-${index}-start_time`}>
                            Waktu Mulai
                          </FormLabel>
                          <FormControl>
                            <Input
                              id={`events-${index}-start_time`}
                              type="time"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`events.${index}.end_time`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel htmlFor={`events-${index}-end_time`}>
                            Waktu Selesai
                          </FormLabel>
                          <FormControl>
                            <Input
                              id={`events-${index}-end_time`}
                              type="time"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={control}
                    name={`events.${index}.venue`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`events-${index}-venue`}>
                          Lokasi
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`events-${index}-venue`}
                            placeholder="Gang Mawar No 7, Jln Tua Buduk, Mengwi, Badung"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`events.${index}.location_url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`events-${index}-location_url`}>
                          Lokasi Url (Google Maps)
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`events-${index}-location_url`}
                            placeholder="https://maps.app.goo.gl/..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pr-3 pt-3">
            <div>
              <Button
                type="button"
                onClick={() =>
                  append({
                    title: "",
                    date: "",
                    start_time: "",
                    end_time: "",
                    venue: "",
                    location_url: "",
                  })
                }
                disabled={formState.isSubmitting}
              >
                Tambah Acara
              </Button>
            </div>

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
