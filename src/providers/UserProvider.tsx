"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { UserProps } from "@/src/types";

interface IUserContext {
  user: UserProps | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const UserContext = createContext<IUserContext>({
  user: null,
  loading: true,
  refresh: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user ?? null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
