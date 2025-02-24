import { createContext } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    alarm?: string;
}

export interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {},
    logout: () => {},
});