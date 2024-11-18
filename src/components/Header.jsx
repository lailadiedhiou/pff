// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importez useNavigate
import './Header.css'; // Assurez-vous d'importer le fichier CSS

const Header = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('userToken');
    navigate('/login'); // Redirige vers la page de connexion après déconnexion
  };

  return (
    <header className="header">
      <div className="header-container"> {/* Changement ici */}
        <img className='logo' src="src/images/Fichier 1@300x-100.jpg" alt="logo" />
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/market">Marché</Link>
            </li>
            {/*<li>
              <Link >Tableau de Bord</Link>
            </li>*/}
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/signup">Inscription</Link>
            </li>
            <li>
              <Link to="/cart">Mon panier</Link>
            </li>
            <li>
              <a onClick={handleLogout} className="logout-button">Déconnexion</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
