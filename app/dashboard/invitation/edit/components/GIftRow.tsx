import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GiftSelect } from "./GiftSelect";
import { BANKS } from "@/src/lib/bank-datas";
import { Button } from "@/components/ui/button";

export default function GiftRow({
  index,
  control,
  watch,
  setValue,
  register,
  remove,
  formState,
}: any) {
  const currentBankName = watch(`gifts.${index}.bank_name`) ?? "";

  function handleBankChange(bankName: string) {
    const bank = BANKS.find((b) => b.name === bankName);
    setValue(`gifts.${index}.bank_name`, bankName, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(`gifts.${index}.logo`, bank?.logo ?? "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  return (
    <div className="p-4 border rounded-md shadow-sm relative">
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
            <GiftSelect value={currentBankName} onChange={handleBankChange} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={control}
          name={`gifts.${index}.account_number`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomer Rekening</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`gifts.${index}.owner`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Atas Nama Rekening</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <input type="hidden" {...register(`gifts.${index}.logo` as const)} />
      </div>
    </div>
  );
}
