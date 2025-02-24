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
    const { getAlarm, error } = useAlarm();
    const [alarmTime, setAlarmTime] = useState<string | null>(null);

    // Appel unique pour récupérer l'alarme si l'utilisateur est connecté et si alarmTime n'est pas encore défini
    useEffect(() => {
        if (user?.email && !alarmTime) {
            getAlarm(user.email)
                .then((data: { alarm: string | null }) => setAlarmTime(data.alarm))
                .catch((err: any) => console.error(err));
        }
    }, [user, alarmTime, getAlarm]);

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
