import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAlarm } from '../../hooks/useAlarm';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { scheduleAlarm, loading, error } = useAlarm();

    // Ouvre une popup pour saisir l'heure et envoyer la valeur au back via le hook useAlarm
    const handleScheduleNotifications = async () => {
        const time = window.prompt("Veuillez saisir l'heure (HH:MM) pour la notification du quiz du jour:");
        if (time) {
            try {
                const data = await scheduleAlarm(time);
                console.log(`Notification programmée à ${time}`, data);
            } catch (err) {
                console.error("Erreur lors de la programmation de la notification", err);
            }
        }
    };

    // Navigation vers la page des cartes
    const handleAllCards = () => {
        navigate('/cards');
    };

    // Navigation vers la page du quiz
    const handleStartQuiz = () => {
        navigate('/quiz');
    };

    // Navigation vers la page de création de carte
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
