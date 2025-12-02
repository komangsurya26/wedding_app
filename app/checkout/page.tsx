import { CheckoutProduct } from "./components/CheckoutProduct";
import { Suspense } from "react";
import { FallbackCheckout } from "./components/FallbackCheckout";

export const metadata = {
  title: "Checkout — Resepsi Bali",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<FallbackCheckout />}>
      <CheckoutProduct />
    </Suspense>
  );
}
