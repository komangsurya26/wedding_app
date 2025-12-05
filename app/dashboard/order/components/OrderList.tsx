"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Order } from "@/src/types";
import { Separator } from "@/components/ui/separator";
import { SearchOrder } from "./SearchOrder";
import { FallbackOrder } from "./FallbackOrder";
import { formatDate, formatExpired } from "@/src/lib/utils";
import { CancelOrder } from "./CancelOrder";
import { DetailOrder } from "./DetailOrder";
import { useSearchParams } from "next/navigation";

export function OrderList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("order_id");

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState(search ?? "");

  // filter berdasarkan order_ref
  const filtered = orders.filter((o) =>
    o.order_ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/orders", {
          credentials: "include",
          cache: "no-store",
        });
        const { data } = await res.json();
        setOrders(data);
      } catch (error) {
        toast.warning("Gagal mengambil data order");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <FallbackOrder />;

  return (
    <div className="w-full h-full">
      <div className="space-y-3 mb-4">
        <SearchOrder
          searchTerm={searchTerm}
          onSearch={(e) => setSearchTerm(e)}
        />

        <Separator className="shadow-sm" />
      </div>

      <div className="w-full h-[75vh] overflow-y-auto hide-scrollbar">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Judul Undangan</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead>Kedaluwarsa</TableHead>
              <TableHead>Dibayar</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order, idx) => (
              <TableRow key={idx}>
                <TableCell className="truncate max-w-30">
                  {order.order_ref}
                </TableCell>
                <TableCell>{order.title_invitation}</TableCell>
                <TableCell>Rp {order.amount.toLocaleString("id-ID")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "PAID"
                        ? "success"
                        : order.status === "PENDING"
                        ? "warning"
                        : order.status === "WAITING_PAYMENT"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>{formatExpired(order.expires_at)}</TableCell>
                <TableCell>{formatDate(order.paid_at)}</TableCell>

                {/* ACTIONS PAY */}
                <TableCell className="space-x-2 flex justify-end">
                  {order.status === "PENDING" && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => {
                        window.location.href = order.url_payment;
                      }}
                      className="cursor-pointer"
                    >
                      Bayar
                    </Button>
                  )}
                  {/* ACTIONS CANCEL */}
                  {order.status === "PENDING" && (
                    <CancelOrder
                      order_ref={order.order_ref}
                      onCancelSuccess={(order_ref) =>
                        setOrders((prev) =>
                          prev.filter((o) => o.order_ref !== order_ref)
                        )
                      }
                    />
                  )}
                  {/* ACTIONS DETAIL */}
                  <DetailOrder order={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <div className="h-10"></div> */}
    </div>
  );
}
