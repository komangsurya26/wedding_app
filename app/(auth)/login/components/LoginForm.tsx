"use client";

import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

import Link from "next/link";
import SignWithGoogleButton from "./SignWithGoogleButton";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/src/actions/auth-actions";
import { useUserStore } from "@/src/stores/user-store";

const LoginSchema = z.object({
  email: z.email({
    pattern: z.regexes.html5Email,
    message: "Email tidak valid",
  }),
  password: z.string(),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export function LoginForm({
  next,
  className,
  ...props
}: { next: string } & React.ComponentProps<"div">) {
  const router = useRouter();
  const refresh = useUserStore((state) => state.refresh);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      });
      if (!res.success) {
        toast.error(res.message || "Login gagal");
        return;
      }
      toast.success("Login berhasil!");
      await refresh();
      router.push(next);
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan. Coba lagi.");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Masuk Ke Resepsi Bali Dashboard</CardTitle>
          <CardDescription>
            Masukan email dan password atau login dengan google di bawah
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Button
                          type="button"
                          variant={"link"}
                          onClick={() => {
                            toast.warning("Fitur Segera Hadir");
                          }}
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Lupa password?
                        </Button>
                      </div>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Masukkan password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem className="pt-4">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? <Spinner /> : "Masuk"}
                  </Button>
                  <SignWithGoogleButton nextUrl={next} />
                  <FormDescription className="text-center">
                    Tidak Punya Akun ?{" "}
                    <Link href="/signup" className="underline">
                      Daftar
                    </Link>
                  </FormDescription>
                </FormItem>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
