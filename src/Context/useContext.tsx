import { createContext, type ReactNode } from "react";
import { useAuth } from "../Hooks/useAuth";
import type { User } from "firebase/auth";

type AuthContextType = {

    user: User | null;
    loading: boolean; 
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;

};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {

    const { user, loading, login, logout, register } = useAuth();
    
    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}