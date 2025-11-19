"use client";

import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function GroomEdit({
  invitationId,
  type = "groom", // groom | bride
}: {
  invitationId: string;
  type: string;
}) {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      invitationId,
      groomName:
        (document.getElementById("groomName") as HTMLInputElement)?.value ||
        null,
      fatherName:
        (document.getElementById("fatherName") as HTMLInputElement)?.value ||
        null,
      motherName:
        (document.getElementById("motherName") as HTMLInputElement)?.value ||
        null,
    };
    await fetch("/api/invitations/update-groom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm">Nama Lengkap</span>
          <input
            id="groomName"
            className="w-full rounded border px-3 py-2 mt-1"
            placeholder={
              type === "groom"
                ? "I Putu Romeo, S.T., M.T."
                : "Ni Putu Juliet, S.M"
            }
          />
        </label>
        <label className="block">
          <span className="text-sm">Nama Bapak</span>
          <input
            id="fatherName"
            className="w-full rounded border px-3 py-2 mt-1"
            placeholder="I Wayan Jaya"
          />
        </label>
        <label className="block">
          <span className="text-sm">Nama Ibu</span>
          <input
            id="motherName"
            className="w-full rounded border px-3 py-2 mt-1"
            placeholder="Ni Nengah Ayu"
          />
        </label>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </div>
    </form>
  );
}
