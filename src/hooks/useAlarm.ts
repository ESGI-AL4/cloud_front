// hooks/useAlarm.ts
import { useState } from 'react';
import axios from 'axios';

export const useAlarm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const backUrl = import.meta.env.VITE_BACK_URL;

    const scheduleAlarm = async (time: string) => {
        setLoading(true);
        setError(null);
        try {
            // Remplacez par l'URL réelle de votre API
            const response = await axios.post(`${backUrl}/alarm`, { time });
            return response.data;
        } catch (err: any) {
            console.error("Erreur dans useAlarm:", err);
            setError(err.message || 'Erreur lors de la programmation de la notification');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { scheduleAlarm, loading, error };
};
