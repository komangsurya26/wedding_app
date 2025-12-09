"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";

export function CancelOrder({
  order_ref,
  onCancelSuccess,
}: {
  order_ref: string;
  onCancelSuccess: (order_ref: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const cancelOrder = async () => {
    toast("Apakah anda yakin membatalkan order?", {
      action: {
        label: "Yakin",
        onClick: async () => {
          try {
            setLoading(true);
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}api/orders/cancel`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  order_ref,
                }),
              }
            );
            const { data } = await res.json();
            if (data.status_code === "412") {
              throw new Error();
            }
            toast.success("Order berhasil dibatalkan");
            onCancelSuccess(order_ref);
          } catch (error) {
            toast.error("Gagal membatalkan order");
          } finally {
            setLoading(false);
          }
        },
      },
    });
  };
  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={cancelOrder}
      className="cursor-pointer"
    >
      {loading ? "Cancel.." : "Cancel"}
    </Button>
  );
}
