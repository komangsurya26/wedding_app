"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { createEvent } from "@/actions/event-actions";
import {
  EventsArraySchema,
  EventArraySchemaType,
} from "@/schemas/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useEvent } from "@/hooks/use-event";
import { Skeleton } from "@/components/ui/skeleton";
import { EventCard } from "./EventCard";

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
              <EventCard
                key={field.id}
                index={index}
                control={control}
                remove={remove}
                isSubmitting={formState.isSubmitting}
              />
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
                {formState.isSubmitting ? "Menyimpan..." : "Simpan Acara"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </form>
    </Form>
  );
}
