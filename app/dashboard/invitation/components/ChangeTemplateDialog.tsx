"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TEMPLATE_LIST } from "@/src/lib/template-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { Invitation } from "@/src/types";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const templateSchema = z.object({
  template_id: z.string().min(1, "Pilih template"),
});

type TemplateSchemaType = z.infer<typeof templateSchema>;

export function ChangeTemplateDialog({
  open,
  onOpen,
  invitation,
}: {
  open: boolean;
  onOpen: (value: boolean) => void;
  invitation: Invitation;
}) {
  const [loading, setLoading] = useState(false);

  const invitationId = invitation.invitationId;

  const form = useForm<TemplateSchemaType>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      template_id: "",
    },
  });

  const { setValue, handleSubmit, formState } = form;

  useEffect(() => {
    if (!open) return;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/invitations/${invitationId}`);
        const { invitation: data } = await res.json();
        setValue("template_id", String(data.template_id));
      } catch (err) {
        toast.error("Gagal memuat invitation");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [open, setValue, invitationId]);

  const onSubmit = async (values: TemplateSchemaType) => {
    try {
      const res = await fetch("/api/invitations/update", {
        method: "POST",
        body: JSON.stringify({
          invitation_id: invitationId,
          template_id: values.template_id,
        }),
      });
      await res.json();
      toast.success("Ganti template sukses");
      onOpen(false);
    } catch (error) {
      toast.error("Gagal ganti template");
      onOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => onOpen(val)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ganti Template Undangan</DialogTitle>
          <DialogDescription>
            Pilih salah satu template untuk undangan Anda.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-3 flex flex-col items-end">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* SELECT TEMPLATE */}
              <FormField
                control={form.control}
                name="template_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilih Template</FormLabel>
                    <FormControl>
                      <Select
                        key={field.value}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih template" />
                        </SelectTrigger>
                        <SelectContent>
                          {TEMPLATE_LIST.map((temp, idx) => (
                            <SelectItem key={idx} value={`${temp.id}`}>
                              {temp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button disabled={formState.isSubmitting} type="submit">
                  {formState.isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
