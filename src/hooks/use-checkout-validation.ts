import { useEffect, useState } from "react";
import { TEMPLATE_LIST } from "@/src/lib/template-data";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Invitation } from "../types";

interface Template {
  id: number;
  name: string;
  type: string;
  img: string;
  price: number;
  href: string;
}

/**
 * Hook untuk:
 * - validasi templateId dari query (caller tangani redirect)
 * - cek invitation user via /api/invitations untuk menentukan discount
 */
export function useCheckoutValidation({
  templateId,
  invitationId,
  router,
}: {
  templateId: string | null;
  invitationId: string | null;
  router: AppRouterInstance;
}) {
  const [checking, setChecking] = useState<boolean>(true);
  const [valid, setValid] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [template, setTemplate] = useState<Template | null>(null);
  const [invitation, setInvitation] = useState<Invitation | null>(null);

  useEffect(() => {
    async function validateTemplate() {
      setChecking(true);
      if (invitationId) {
        router.push("/dashboard/invitation");
        return;
      }

      if (!templateId) {
        router.push("/dashboard/invitation/create");
        return;
      }

      const foundTemplate = TEMPLATE_LIST.find(
        (t) => String(t.id) === String(templateId)
      );
      if (!foundTemplate) {
        router.push("/dashboard/invitation/create");
        return;
      }
      const res = await fetch(`/api/invitations`, {
        credentials: "include",
      });
      const json = await res.json();

      const hasData = json.ok && Array.isArray(json.data) && json.data.length > 0;
      setDiscount(hasData ? 0 : foundTemplate.price);

      setTemplate(foundTemplate);
      setValid(true)
      setChecking(false)
    }

    async function validateInvit() {
      setChecking(true);

      if (templateId) {
        router.push("/dashboard/invitation/create");
        return;
      }
      if (!invitationId) {
        router.push("/dashboard/invitation");
        return;
      }

      const res = await fetch(`/api/invitations/${invitationId}?expired=true`, {
        credentials: "include",
      });
      const json = await res.json();
      if (!json.ok) {
        router.push("/dashboard/invitation");
        return;
      }

      const foundTemplate = TEMPLATE_LIST.find(
        (t) => String(t.id) === String(json.invitation.template_id)
      );
      if (!foundTemplate) {
        router.push("/dashboard/invitation");
        return;
      }
      setDiscount(0);
      setTemplate(foundTemplate)
      setInvitation({
        urlInvitation: json.invitation.invitation_url,
        name: json.invitation.invitation_name
      });
      setValid(true)
      setChecking(false)
    }

    if (templateId) {
      validateTemplate();
    }
    if (invitationId) {
      validateInvit();
    }
  }, [templateId, invitationId, router]);

  return { checking, valid, template, discount, invitation };
}
