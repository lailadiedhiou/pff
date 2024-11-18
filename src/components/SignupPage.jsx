import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== passwordConfirmation) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return;
        }

        const data = { name, email, password, password_confirmation: passwordConfirmation, role };
        setIsLoading(true);
        setErrorMessage('');

        axios.post('http://localhost:8000/api/register', data)
            .then(response => {
                setIsLoading(false);
                navigate('/login');
            })
            .catch(error => {
                setIsLoading(false);
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.message || "Une erreur est survenue");
                } else {
                    setErrorMessage("Erreur de connexion");
                }
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nom complet"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Adresse e-mail"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        required
                    />
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Confirmer le mot de passe"
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Choisir un rôle</option>
                        <option value="agriculteur">Agriculteur</option>
                        <option value="commercant">Commerçant</option>
                        <option value="consommateur">Consommateur</option>
                        <option value="administrateur">Administrateur</option>
                    </select>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Inscription en cours...' : "S'inscrire"}
                    </button>
                </form>
                <p>Déjà inscrit ? <a href="/login">Connectez-vous ici</a></p>
            </div>
        </div>
    );
}

export default SignupPage;
