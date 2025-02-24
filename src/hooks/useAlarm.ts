// hooks/useAlarm.ts
import { useState } from 'react';
import axios from 'axios';

export const useAlarm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const backUrl = import.meta.env.VITE_BACK_URL;

    const scheduleAlarm = async (time: string, email: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${backUrl}/alarm`, { email, time });
            return response.data;
        } catch (err: any) {
            console.error("Erreur dans scheduleAlarm:", err);
            setError(err.message || 'Erreur lors de la programmation de la notification');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getAlarm = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${backUrl}/alarm`, { params: { email } });
            return response.data;
        } catch (err: any) {
            console.error("Erreur dans getAlarm:", err);
            setError(err.message || 'Erreur lors de la récupération de l’alarme');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { scheduleAlarm, getAlarm, loading, error };
};
