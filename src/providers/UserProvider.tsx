"use client";

import { UserProps } from "@/src/types";
import { createContext, useContext } from "react";

const UserContext = createContext<UserProps>({} as UserProps);

interface UserProviderProps {
  children: React.ReactNode;
  user: UserProps;
}

export function UserProvider({ children, user }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
