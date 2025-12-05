import React, { Suspense } from "react";
import { OrderList } from "./components/OrderList";
import { FallbackOrder } from "./components/FallbackOrder";

export default function OrderPage() {
  return (
    <Suspense fallback={<FallbackOrder />}>
      <OrderList />
    </Suspense>
  );
}
