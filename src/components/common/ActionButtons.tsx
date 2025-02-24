import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import './ActionButtons.css';
import { useAlarm } from '../../hooks/useAlarm';
import { AuthContext } from '../../contexts/AuthContext';

interface ActionButtonsProps {
    onScheduleNotifications: () => void;
    onStartQuiz: () => void;
    onAddCard: () => void;
    onAllCards: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
                                                         onScheduleNotifications,
                                                         onStartQuiz,
                                                         onAddCard,
                                                         onAllCards,
                                                     }) => {
    const { user } = useContext(AuthContext);
    const { getAlarm, loading, error } = useAlarm();
    const [alarmTime, setAlarmTime] = useState<string | null>(null);

    // Au montage, si l'utilisateur est connecté, on récupère son alarme via son email.
    useEffect(() => {
        if (user?.email) {
            getAlarm(user.email)
                .then((data: { alarm: React.SetStateAction<string | null>; }) => setAlarmTime(data.alarm))
                .catch((err: any) => console.error(err));
        }
    }, [user, getAlarm]);

    return (
        <div className="action-buttons">
            <Button
                label="Régler l'heure des notifications"
                icon="pi pi-clock"
                className="p-mr-2"
                onClick={onScheduleNotifications}
            />
            <Button
                label="Toutes mes cartes"
                icon="pi pi-play"
                className="p-mr-2"
                onClick={onAllCards}
            />
            <Button
                label="Lancer le quiz"
                icon="pi pi-play"
                className="p-mr-2"
                onClick={onStartQuiz}
            />
            <Button label="Ajouter une carte" icon="pi pi-plus" onClick={onAddCard} />

            {loading && <p>Chargement de l'alarme...</p>}
            {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
            {alarmTime && (
                <div style={{ marginTop: '10px' }}>
                    <p>Notification programmée à : {alarmTime}</p>
                </div>
            )}
        </div>
    );
};

export default ActionButtons;
