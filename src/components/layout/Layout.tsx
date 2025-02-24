// src/components/layout/Layout.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAlarm } from '../../hooks/useAlarm';
import { AuthContext } from '../../contexts/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { scheduleAlarm, loading, error } = useAlarm();
    const { user } = useContext(AuthContext); // récupération de l'utilisateur connecté

    // Ouvre une popup pour saisir l'heure et envoyer la valeur au back avec l'email de l'utilisateur
    const handleScheduleNotifications = async () => {
        const time = window.prompt("Veuillez saisir l'heure (HH:MM) pour la notification du quiz du jour:");
        if (time) {
            if (!user || !user.email) {
                console.error("Aucun utilisateur connecté ou email manquant");
                return;
            }
            try {
                const data = await scheduleAlarm(time, user.email);
                console.log(`Notification programmée à ${time}`, data);
            } catch (err) {
                console.error("Erreur lors de la programmation de la notification", err);
            }
        }
    };

    const handleAllCards = () => {
        navigate('/cards');
    };

    const handleStartQuiz = () => {
        navigate('/quiz');
    };

    const handleAddCard = () => {
        navigate('/create-card');
    };

    return (
        <div className="app-layout">
            <Header
                onScheduleNotifications={handleScheduleNotifications}
                onAllCards={handleAllCards}
                onStartQuiz={handleStartQuiz}
                onAddCard={handleAddCard}
            />
            <main>{children}</main>
            {loading && <p>Programmation de la notification en cours...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Layout;
