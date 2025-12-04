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

export function OrderList() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

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

  function formatDate(date?: string | null) {
    if (!date) return "-";
    return new Intl.DateTimeFormat("id", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }

  if (loading) return <FallbackOrder />;

  return (
    <div className="space-y-5">
      <SearchOrder />

      <Separator className="shadow-sm" />

      <div className="overflow-y-auto hide-scrollbar">
        <div className="w-full pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead>Kedaluwarsa</TableHead>
                <TableHead>Dibayar</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order, idx) => (
                <TableRow key={idx}>
                  <TableCell className="truncate max-w-30">
                    {order.order_ref}
                  </TableCell>
                  <TableCell>{order.title_invitation}</TableCell>
                  <TableCell>
                    Rp {order.amount.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "PAID"
                          ? "success"
                          : order.status === "PENDING"
                          ? "outline"
                          : order.status === "WAITING_PAYMENT"
                          ? "secondary"
                          : order.status === "CANCELLED"
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{formatDate(order.expires_at)}</TableCell>
                  <TableCell>{formatDate(order.paid_at)}</TableCell>

                  {/* ACTIONS */}
                  <TableCell className="text-right space-x-2">
                    {/* Button Bayar */}
                    {order.status === "PENDING" && (
                      <Button size="sm" variant="default">
                        Bayar
                      </Button>
                    )}

                    {/* Button Cancel */}
                    {order.status === "PENDING" && (
                      <Button size="sm" variant="destructive">
                        Cancel
                      </Button>
                    )}

                    {/* Button Detail */}
                    <Button size="sm" variant="outline">
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
