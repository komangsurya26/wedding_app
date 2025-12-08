"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SignWithGoogleButton from "../../login/components/SignWithGoogleButton";
import Link from "next/link";
import { signup } from "@/src/lib/auth-actions";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/src/stores/user-store";

const RegisterSchema = z
  .object({
    firstName: z.string().min(1, "Nama depan wajib diisi"),
    lastName: z.string().min(1, "Nama belakang wajib diisi"),
    email: z.email({
      pattern: z.regexes.html5Email,
      message: "Email tidak valid",
    }),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak sesuai",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export function SignupForm({
  next,
  ...props
}: { next: string } & React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const refresh = useUserStore((state) => state.refresh);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      const res = await signup({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      if (!res.success) {
        toast.error(res.message || "Daftar gagal");
        return;
      }
      toast.success("Pendaftaran berhasil!");
      await refresh();
      router.push(next);
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan. Coba lagi.");
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Daftar Akun</CardTitle>
        <CardDescription>
          Masukan form atau login dengan google di bawah
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="first-name">Nama Depan</FormLabel>
                    <FormControl>
                      <Input id="first-name" placeholder="Komang" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="last-name">Nama Belakang</FormLabel>
                    <FormControl>
                      <Input id="last-name" placeholder="Surya" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="example@mail.com"
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
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirm-password">
                      Konfirmasi Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="pt-4">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Daftar Akun..." : "Daftar"}
                </Button>
                <SignWithGoogleButton nextUrl={next} />
                <div className="text-center">
                  <FieldDescription>
                    Sudah punya akun?{" "}
                    <Link href="/login" className="underline ml-1">
                      Masuk
                    </Link>
                  </FieldDescription>
                </div>
              </FormItem>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
