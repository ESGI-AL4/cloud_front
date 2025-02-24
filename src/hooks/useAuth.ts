// hooks/useAuth.ts
import { useState } from 'react';
import axios from 'axios';
import { User } from '../contexts/AuthContext';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const backUrl = import.meta.env.VITE_BACK_URL;

    const login = async (name: string, email: string): Promise<User | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<User>(`${backUrl}/auth`, { name, email });
            return response.data;
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la connexion');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};
