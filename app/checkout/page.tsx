import { CheckoutProduct } from "./components/CheckoutProduct";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Checkout — Resepsi Bali",
};

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutProduct />
    </Suspense>
  );
}
