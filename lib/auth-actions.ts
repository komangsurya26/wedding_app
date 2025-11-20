"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(data: { email: string; password: string }) {
    try {
        const supabase = createClient();
        const { error } = await (await supabase).auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        if (error) {
            return { success: false, message: "Email atau password salah" };
        }
        return { success: true, message: "Login berhasil" };
    } catch (error) {
        return {
            success: false,
            message: "Terjadi kesalahan server. Coba beberapa saat lagi.",
        };
    }
}

export async function signup(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}) {
    try {
        const supabase = createClient();
        const firstName = data.firstName;
        const lastName = data.lastName;

        const { error } = await (await supabase).auth.signUp(
            {
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: `${firstName + " " + lastName}`,
                        email: data.email,
                    },
                },
            }
        );

        if (error) {
            return { success: false, message: "Gagal daftar" };
        }

        return { success: true, message: "Daftar berhasil" };
    } catch (error) {
        return {
            success: false,
            message: "Terjadi kesalahan server. Coba beberapa saat lagi.",
        };
    }
}

export async function signout() {
    const supabase = createClient();
    const { error } = await (await supabase).auth.signOut();
    if (error) {
        console.log(error);
        redirect("/error");
    }

    redirect("/");
}

export async function signInWithGoogle(nextUrl: string) {
    const supabase = createClient();
    const { data, error } = await (await supabase).auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback?next=${encodeURIComponent(nextUrl)}`,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) {
        console.log(error);
        redirect("/error");
    }

    redirect(data.url);
}