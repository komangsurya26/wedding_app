"use client";

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChildOrderSelect } from "./ChildOrderSelect";

export default function GroomForm({
  form,
  type,
}: {
  form: any;
  type: "groom" | "bride";
}) {
  const groomName = "I Putu Romeo, S.T., M.T.";
  const brideName = "Ni Putu Juliet, S.M";
  const defaultFullName = type === "groom" ? groomName : brideName;
  const defaultShortName = type === "groom" ? "Romeo" : "Juliet";

  return (
    <>
      <FormField
        control={form.control}
        name="full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="full_name">Nama Lengkap</FormLabel>
            <FormControl>
              <Input id="full_name" placeholder={defaultFullName} {...field} />
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
            <FormLabel>Anak ke berapa</FormLabel>
            <FormControl>
              <ChildOrderSelect value={field.value} onChange={field.onChange} />
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
              <Input id="father" placeholder="I Wayan Jaya" {...field} />
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
              <Input id="mother" placeholder="Ni Nengah Ayu" {...field} />
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
            <FormLabel htmlFor="instagram">Instagram (Tanpa @)</FormLabel>
            <FormControl>
              <Input id="instagram" placeholder="komangsurya_26" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
