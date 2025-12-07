"use client";

import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { Invitation } from "@/src/types";
import { ChangeTemplateDialog } from "./ChangeTemplateDialog";
import { useState } from "react";

export function ChangeTemplate({
  invitation,
}: {
  invitation: Invitation;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <SquarePen className="h-4 w-4" />
        Ganti Template
      </Button>
      <ChangeTemplateDialog
        open={open}
        onOpen={(val) => setOpen(val)}
        invitation={invitation}
      />
    </>
  );
}
