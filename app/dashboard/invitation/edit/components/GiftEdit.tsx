"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import {
  GiftsArraySchema,
  GiftsArraySchemaType,
} from "@/src/schemas/gift.schema";
import { createGift } from "@/src/lib/gift-invitation";
import { BANKS } from "@/src/lib/bank";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GiftEdit({
  invitationId,
  onClose,
}: {
  invitationId: number;
  onClose: () => void;
}) {
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

  function handleBankSelect(code: string, index: number) {
    const bank = BANKS.find((b) => b.code === code);

    if (bank) {
      setValue(`gifts.${index}.bank_name`, bank.name, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue(`gifts.${index}.logo`, bank.logo, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      setValue(`gifts.${index}.bank_name`, "", {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue(`gifts.${index}.logo`, "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col max-h-[70vh]">
          <div className="flex-1 overflow-y-auto pr-3 pb-5 pt-2 space-y-6">
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="p-4 border rounded-md shadow-sm relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">Gift #{index + 1}</div>
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
                    <FormItem>
                      <FormLabel>Bank</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(code) =>
                            handleBankSelect(code, index)
                          }
                        >
                          <SelectTrigger className="w-full text-base font-light">
                            <SelectValue placeholder="Pilih bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {BANKS.map((b) => (
                              <SelectItem key={b.code} value={b.code}>
                                {b.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>

                    <FormField
                      control={control}
                      name={`gifts.${index}.account_number`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={`gifts-${index}-account_number`}>
                            Nomer Rekening
                          </FormLabel>
                          <FormControl>
                            <Input
                              id={`gifts-${index}-account_number`}
                              type="number"
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
                        name={`gifts.${index}.owner`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel htmlFor={`gifts-${index}-owner`}>
                              Atas Nama Rekening
                            </FormLabel>
                            <FormControl>
                              <Input id={`gifts-${index}-owner`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <input
                        type="hidden"
                        {...register(`gifts.${index}.bank_name` as const)}
                      />
                      <input
                        type="hidden"
                        {...register(`gifts.${index}.logo` as const)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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
