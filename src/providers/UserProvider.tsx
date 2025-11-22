"use client";

import { UserProps } from "@/src/types";
import { createContext, useContext, useEffect, useState } from "react";

interface IUserContext {
  user: UserProps | null;
  loading: boolean;
}

const UserContext = createContext<IUserContext>({
  user: null,
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        setUser({} as UserProps);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUser(data.user ?? null);
      setLoading(false);
    };

    load();
  }, []);
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
