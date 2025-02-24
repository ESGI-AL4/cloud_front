// src/pages/LoginPage/LoginPage.tsx
import React, { useState, useContext } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { AuthContext } from '../../contexts/AuthContext';
import './LoginPage.css';
import { FloatLabel } from 'primereact/floatlabel';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginPage: React.FC = () => {
    const { login: loginContext } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [localError, setLocalError] = useState('');
    const navigate = useNavigate();

    const { login, loading, error } = useAuth();

    const handleLogin = async () => {
        if (!name.trim() || !email.trim()) {
            setLocalError('Le nom et l’email sont obligatoires');
            return;
        }
        setLocalError('');
        const user = await login(name, email);
        if (user) {
            loginContext(user);
            navigate('/cards');
        }
    };

    return (
        <div className="login-page">
            <Card title="Connexion" className="login-card">
                <div className="card justify-content-center p-field">
                    <FloatLabel>
                        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Nom</label>
                    </FloatLabel>
                </div>
                <div className="card justify-content-center p-field">
                    <FloatLabel>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </FloatLabel>
                </div>
                <div className="error-container">
                    {(localError || error) && <small className="p-error">{localError || error}</small>}
                </div>
                <Button label="Se connecter" icon="pi pi-sign-in" onClick={handleLogin} className="p-mt-2" disabled={loading} />
            </Card>
        </div>
    );
};

export default LoginPage;
