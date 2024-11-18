import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // Utilisé pour récupérer l'état de redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Réinitialiser les erreurs
    
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });
    
            const { user, token } = response.data;
    
            if (!token) {
                setError("Token non reçu. Veuillez vérifier le backend.");
                return;
            }
    
            // Stocke le rôle et le token de l'utilisateur dans le stockage local
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('role', user.role);
            localStorage.setItem('token', token);
    
            // Redirige l'utilisateur en fonction de son rôle
            const redirectTo = location.state?.from || '/';
            if (user.role === 'administrateur') {
                navigate('/admin');
            } else if (user.role === 'agriculteur') {
                navigate('/farmer-dashboard');
            } else if (user.role === 'commercant') {
                navigate('/merchant-dashboard');
            } else if (user.role === 'consommateur') {
                navigate(redirectTo);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error || 'Une erreur est survenue.');
            } else {
                setError('Erreur réseau. Veuillez réessayer.');
            }
        }
    };
    

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Connexion</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Se connecter</button>
                </form>
                <p>Pas encore inscrit ? <a href="/signup">Inscrivez-vous ici</a></p>
            </div>
        </div>
    );
}

export default LoginPage;
