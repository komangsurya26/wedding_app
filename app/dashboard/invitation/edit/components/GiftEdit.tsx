"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import {
  GiftsArraySchema,
  GiftsArraySchemaType,
} from "@/src/schemas/gift.schema";
import { createGift } from "@/src/lib/gift-actions";
import { useGift } from "@/src/hooks/use-gift";
import { Skeleton } from "@/components/ui/skeleton";
import GiftRow from "./GIftRow";

export function GiftEdit({
  invitationId,
  onClose,
}: {
  invitationId: number;
  onClose: () => void;
}) {
  const { gifts, loading } = useGift(invitationId);

  const form = useForm<GiftsArraySchemaType>({
    resolver: zodResolver(GiftsArraySchema),
    defaultValues: {
      gifts: [
        {
          bank_name: "",
          account_number: "",
          owner: "",
          logo: "",
        },
      ],
    },
    mode: "onBlur",
  });

  const { control, handleSubmit, formState, watch, register, setValue } = form;

  useEffect(() => {
    if (!gifts) return;

    const map = gifts.map((gift) => ({
      bank_name: gift.bank_name,
      account_number: gift.account_number,
      owner: gift.owner,
      logo: gift.logo,
    }));

    setValue("gifts", map);
  }, [gifts, setValue]);

  const { fields, append, remove } = useFieldArray<
    GiftsArraySchemaType,
    "gifts"
  >({
    control,
    name: "gifts",
  });

  async function onSubmit(values: GiftsArraySchemaType) {
    try {
      const payload = values.gifts.map((gift) => ({
        invitation_id: invitationId,
        ...gift,
      }));

      await createGift(payload);

      toast.success("Kado Digital berhasil disimpan");

      onClose();
    } catch (error) {
      toast.error("Kado Digital gagal disimpan");
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col max-h-[70vh]">
          <div className="flex-1 overflow-y-auto hide-scrollbar pr-3 pb-5 pt-2 space-y-6">
            {fields.map((field, index) => (
              <GiftRow
                key={field.id}
                index={index}
                control={control}
                watch={watch}
                setValue={setValue}
                register={register}
                remove={remove}
                formState={formState}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pr-3 pt-3">
            <div>
              <Button
                type="button"
                onClick={() =>
                  append({
                    account_number: "",
                    owner: "",
                    bank_name: "",
                    logo: "",
                  })
                }
                disabled={formState.isSubmitting}
              >
                Tambah Gift
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
