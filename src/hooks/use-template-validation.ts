import { useEffect, useState } from "react";
import { TEMPLATE_LIST } from "@/src/lib/template-data";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
/**
 * Hook untuk:
 * - validasi templateId dari query (caller tangani redirect)
 * - cek invitation user via /api/invitations untuk menentukan discount
 */
interface Template {
  id: number
  name: string
  type: string
  img: string
  price: number
  href: string
};

export function useTemplateValidation({
  templateId,
  router,
}: {
  templateId: string | null;
  router: AppRouterInstance
}) {
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    let mounted = true;
    async function boot() {
      setChecking(true);
      if (!templateId) {
        router.push("/dashboard/invitation/create");
        return;
      }

      const found = TEMPLATE_LIST.find(
        (t) => String(t.id) === String(templateId)
      );
      if (!found) {
        router.push("/dashboard/invitation/create");
        return;
      }
      if (!mounted) return;
      setTemplate(found);
      setValid(true);

      const res = await fetch("/api/invitations", {
        credentials: "include",
      });
      const json = await res.json();
      const hasData = json.ok && Array.isArray(json.data) && json.data.length > 0;
      setDiscount(hasData ? 0 : found.price)
      setChecking(false)
    }
    boot();
    return () => {
      mounted = false;
    };
  }, [templateId, router]);

  return { checking, valid, template, discount };
}
