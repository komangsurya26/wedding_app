"use client";

import { create } from "zustand";
import type { UserProps } from "@/src/types";

interface UserState {
    user: UserProps | null;
    loading: boolean;
    refresh: () => Promise<void>;
    setUser: (user: UserProps | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,
    setUser: (user) => set({ user }),
    refresh: async () => {
        set({ loading: true });
        try {
            const res = await fetch("/api/auth/me", { credentials: "include" });
            if (!res.ok) {
                set({ user: null });
                return;
            }
            const data = await res.json();
            set({ user: data.user ?? null });
        } catch {
            set({ user: null });
        } finally {
            set({ loading: false });
        }
    },
}));
