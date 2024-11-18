// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Met à jour en fonction de la présence du token
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true); // Met isAuthenticated à true après login
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false); // Met isAuthenticated à false après logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
