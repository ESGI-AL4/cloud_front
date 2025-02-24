import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import './ActionButtons.css';
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

            {user?.alarm && (
                <div style={{ marginTop: '10px' }}>
                    <p>Notification programmée à : {user.alarm}</p>
                </div>
            )}
        </div>
    );
};

export default ActionButtons;
