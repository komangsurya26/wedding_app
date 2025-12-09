import { useEffect, useState } from "react";
import { TEMPLATE_LIST } from "@/src/lib/template-data";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Invitation } from "../types";
import { useInvitationStore } from "../stores/invitation-store";

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
  const [isReady, setIsReady] = useState(false);

  const { invitations, fetchInvitations } = useInvitationStore();

  useEffect(() => {
    fetchInvitations().finally(() => setIsReady(true));
  }, [fetchInvitations]);

  useEffect(() => {
    if (!isReady) return;

    function validate() {
      setChecking(true);

      // Validasi invitationId ada
      if (invitationId) {
        if (templateId) {
          router.push("/dashboard/invitation/create");
          return;
        }
        if (!invitationId) {
          router.push("/dashboard/invitation");
          return;
        }
        const foundInvit = invitations.find(
          (inv) => inv.invitationId === Number(invitationId)
        );
        if (!foundInvit) {
          router.push("/dashboard/invitation");
          return;
        }

        if (!foundInvit.expired) {
          router.push("/dashboard/invitation");
          return;
        }

        const foundTemplate = TEMPLATE_LIST.find(
          (t) => String(t.id) === String(foundInvit.templateId)
        );

        if (!foundTemplate) {
          router.push("/dashboard/invitation");
          return;
        }
        setDiscount(0);
        setTemplate(foundTemplate)
        setInvitation({
          urlInvitation: foundInvit.urlInvitation,
          name: foundInvit.name,
        });
        setValid(true)

        // Validasi templateId ada
      } else if (templateId) {
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

        setDiscount(invitations.length > 0 ? 0 : foundTemplate.price);
        setTemplate(foundTemplate);
        setValid(true)
      } else {
        router.push("/dashboard/invitation/create");
        return;
      }
      setChecking(false);
    };

    validate();
  }, [templateId, invitationId, router, isReady]);

  return { checking, valid, template, discount, invitation };
}
