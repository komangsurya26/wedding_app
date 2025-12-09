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
import { useInvitationStore } from "@/src/stores/invitation-store";

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
  const { setInvitations, invitations } = useInvitationStore();

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
    setValue("template_id", String(invitation.templateId));
  }, [open, setValue, invitationId]);

  const onSubmit = async (values: TemplateSchemaType) => {
    try {
      const selectedTemplate = TEMPLATE_LIST.find(
        (t) => String(t.id) === values.template_id
      );

      if (!selectedTemplate) {
        toast.error("Template tidak ditemukan");
        return;
      }

      const res = await fetch("/api/invitations/update", {
        method: "POST",
        body: JSON.stringify({
          invitation_id: invitationId,
          template_id: selectedTemplate.id,
        }),
      });
      const json = await res.json();
      if (!json.ok) {
        toast.error("Gagal mengganti template");
        onOpen(false);
        return;
      }

      // Update invitation store zod
      const updatedInvitations = invitations.map((inv) =>
        inv.invitationId === invitationId
          ? {
              ...inv,
              templateId: selectedTemplate.id,
              templateType: selectedTemplate.type,
            }
          : inv
      );
      setInvitations(updatedInvitations);

      toast.success("Ganti template sukses");
      onOpen(false);
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan");
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
                        {TEMPLATE_LIST.map(
                          (temp, idx) =>
                            // tampilkan template type yang sesuai denngan invitation
                            temp.type === invitation.templateType && (
                              <SelectItem key={idx} value={`${temp.id}`}>
                                {`${temp.name} (${temp.type})`}
                              </SelectItem>
                            )
                        )}
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
      </DialogContent>
    </Dialog>
  );
}
