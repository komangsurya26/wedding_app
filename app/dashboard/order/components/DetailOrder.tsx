"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TEMPLATE_LIST } from "@/src/lib/template-data";
import { formatIDR } from "@/src/lib/utils";
import { Order } from "@/src/types";
import Link from "next/link";
import React from "react";

const TEMPLATE_ACTIVE_DURATION =
  process.env.NEXT_PUBLIC_TEMPLATE_ACTIVE_DURATION;

export function DetailOrder({ order }: { order: Order }) {
  const template =
    TEMPLATE_LIST.find((t) => String(t.id) === String(order.template_id)) ??
    null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="cursor-pointer">
          Detail
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Detail Order</DialogTitle>
          <DialogDescription>
            Informasi mengenai pesanan undangan Anda.
          </DialogDescription>
        </DialogHeader>

        {/* Isi konten */}
        <div className="space-y-3 mt-2">
          <div className="flex justify-between">
            <span className="font-medium">Tipe</span>
            <span className="text-muted-foreground capitalize">
              {template?.type}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Nama Template</span>
            <span className="text-muted-foreground">{template?.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Harga</span>
            <span className="text-muted-foreground">
              {formatIDR(template?.price ?? 0)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Masa Aktif</span>
            <span className="text-muted-foreground">
              {TEMPLATE_ACTIVE_DURATION} Bulan
            </span>
          </div>

          {order.status === "PAID" && (
            <div className="pt-2">
              <p className="font-medium">URL Undangan</p>
              <Link
                href={order.url_invitation}
                className="underline text-muted-foreground text-sm"
              >
                {order.url_invitation}
              </Link>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
