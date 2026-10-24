import { createContext, useContext, type ReactNode } from "react";
import { useAuth as useAuthHook } from "../Hooks/useAuth";

type AuthContextType = ReturnType<typeof useAuthHook>;
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthHook();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}