import { LoginForm } from "@/app/(auth)/login/components/LoginForm";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<SpinnerCustom />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
