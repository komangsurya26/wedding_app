"use client";

import React, { useState } from "react";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { addDay, formatIDR, slugify } from "@/src/lib/utils";
import { useCheckoutValidation } from "@/src/hooks/use-checkout-validation";
import { useUser } from "@/src/providers/UserProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { FallbackCheckout } from "./FallbackCheckout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { createTrialInvitation } from "@/src/lib/invitation-actions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TEMPLATE_ACTIVE_DURATION =
  process.env.NEXT_PUBLIC_TEMPLATE_ACTIVE_DURATION;

type Item = {
  id: string;
  title_invitation: string;
  url_invitation: string;
  price: number;
  quantity: number;
  name: string;
  invitation_id: string | null;
};
type Customer = {
  id: string;
  first_name: string;
  email: string;
};
interface PaymentProps {
  orderId: string;
  amount: number;
  item: Item;
  customer: Customer;
}
interface TrialProps {
  user_id: string;
  template_id: string;
  invitation_name: string;
  invitation_url: string;
  expires_at: string;
}

export function CheckoutProduct() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const invitationId = searchParams.get("invitationId");

  // validation + discount logic in hook
  const { checking, valid, template, discount, invitation } =
    useCheckoutValidation({
      templateId,
      invitationId,
      router,
    });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const price = template?.price ?? 50000;
  const subtotal = price;
  const total = Math.max(subtotal - (discount ?? 0), 0);

  async function handleProceed() {
    setLoading(true);

    try {
      if (templateId) {
        if (!title.trim() || !slug.trim()) {
          toast.warning("Judul undangan dan Url undangan harus diisi");
          return;
        }
      }

      const payload: PaymentProps = {
        orderId: uuid(),
        amount: total,
        item: {
          id: String(template?.id),
          name: template?.name!,
          price: price,
          quantity: 1,
          title_invitation: title ? title : invitation?.name!,
          url_invitation: `${BASE_URL}${slug}`,
          invitation_id: invitationId,
        },
        customer: {
          id: user?.id!,
          first_name: user?.full_name!,
          email: user?.email!,
        },
      };

      const res = await fetch("/api/checkout/create-snap", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.ok) {
        window.location.href = json.data.redirect_url;
      }
    } catch (err) {
      toast.error("Terjadi kesalahan, coba beberapa saat lagi");
    } finally {
      setLoading(false);
    }
  }

  async function handleProceedTrial() {
    setLoading(true);

    try {
      if (!title.trim() || !slug.trim()) {
        toast.warning("Judul undangan dan Url undangan harus diisi");
        return;
      }
      const payload: TrialProps = {
        user_id: user?.id!,
        template_id: String(templateId),
        invitation_name: title.trim(),
        invitation_url: `${BASE_URL}${slug}`,
        expires_at: addDay(new Date(), 1).toISOString(),
      };
      await createTrialInvitation({ payload });
      toast.success("Undangan berhasil dibuat");
      router.push("/dashboard/invitation");
    } catch (error) {
      toast.error("Terjadi kesalahan, coba beberapa saat lagi");
    } finally {
      setLoading(false);
    }
  }

  if (checking) return <FallbackCheckout />;
  if (!valid) return null;

  return (
    <div className="container mx-auto">
      <div className="max-w-lg mx-auto p-6 space-y-8 border h-full rounded-2xl">
        <div className="flex flex-col justify-center items-center space-y-3">
          <div className="h-7">
            <Image
              src={"/favicon/favicon.svg"}
              alt="Logo"
              width={50}
              height={50}
              className="w-full h-full object-contain"
            />
          </div>
          <Label className="text-2xl font-bold tracking-wide">
            {invitationId ? "AKTIVASI ULANG" : "CHECKOUT"}
          </Label>
        </div>
        {/* Judul Undangan */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Judul Undangan</Label>
          {invitationId ? (
            <Input
              value={invitation?.name}
              readOnly
              className="bg-muted cursor-not-allowed text-muted-foreground"
            />
          ) : (
            <Input
              placeholder="Komang & Surya Wedding"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </div>

        {/* URL Undangan */}
        <div className="space-y-2">
          <Label className="text-base font-medium">URL Undangan</Label>
          {templateId ? (
            <>
              <div className="flex items-center gap-2">
                <Input
                  value={BASE_URL}
                  readOnly
                  className="w-[200px] bg-muted cursor-not-allowed text-muted-foreground"
                />
                <Input
                  placeholder="komang-dan-surya"
                  value={slug}
                  onChange={(e) => {
                    setSlug(slugify(e.target.value));
                  }}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Hasil URL:{" "}
                <span className="font-medium">{`${BASE_URL}${
                  slug || "komang-dan-surya"
                }`}</span>
              </p>
            </>
          ) : (
            <Input
              value={invitation?.urlInvitation}
              readOnly
              className="w-full bg-muted cursor-not-allowed text-muted-foreground"
            />
          )}
        </div>

        <Separator />

        {/* Detail Produk */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Detail Produk</Label>
          <div className="flex justify-between">
            <div className="font-normal text-muted-foreground">Tipe</div>
            <div className="font-normal text-muted-foreground capitalize">
              {template?.type}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-normal text-muted-foreground">Nama</div>
            <div className="font-normal text-muted-foreground">
              {template?.name}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-normal text-muted-foreground">Harga</div>
            <div className="font-normal text-muted-foreground">
              {formatIDR(price)}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-normal text-muted-foreground">Masa Aktif</div>
            <div className="font-normal text-muted-foreground">
              {TEMPLATE_ACTIVE_DURATION} Bulan
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <div className="font-normal">Subtotal</div>
            <div className="font-normal">{formatIDR(subtotal)}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-normal">Diskon</div>
            <div className="font-normal">{formatIDR(discount)}</div>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2">
            <div>Total</div>
            <div>{formatIDR(total)}</div>
          </div>
        </div>

        <Separator />
        {/* Footer / Button */}
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">
              Total yang harus dibayar
            </div>
            <div className="text-xl font-semibold">{formatIDR(total)}</div>
          </div>

          <div>
            <Button
              onClick={total === 0 ? handleProceedTrial : handleProceed}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  {total === 0 ? "Menyimpan..." : "Memproses..."}
                  <Spinner className="size-4" />
                </>
              ) : (
                <>{total === 0 ? "Simpan" : "Lanjut Pembayaran"}</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
