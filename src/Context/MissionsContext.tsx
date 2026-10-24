import { createContext, useContext, type ReactNode } from "react";
import { useMissions as useMissionsHook } from "../Hooks/useMissions";

type MissionsContextType = ReturnType<typeof useMissionsHook>;
const MissionsContext = createContext<MissionsContextType | undefined>(undefined);

export function MissionsProvider({ children }: { children: ReactNode }) {
    const m = useMissionsHook();
    return <MissionsContext.Provider value={m}>{children}</MissionsContext.Provider>;
}

export function useMissions() {
    const ctx = useContext(MissionsContext);
    if (!ctx) throw new Error("useMissions debe usarse dentro de MissionsProvider");
    return ctx;
}