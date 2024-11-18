// src/components/Footer.js
import React from 'react';
import './Footer.css';
//import logo from '../assets/logo.png'; // Remplacez avec le chemin de votre logo
//import facebookIcon from '../assets/facebook.png';
//import twitterIcon from '../assets/twitter.png';
//import instagramIcon from '../assets/instagram.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-section footer-logo">
            <img src="src/images/Fichier 1@300x-100.jpg"alt="Marché Agricole Logo" className="footer-logo-img" />
            <p>
              Découvrez des produits frais directement des agriculteurs locaux. Commandez en ligne et soutenez l'agriculture locale.
            </p>
          </div>
          <div className="footer-section footer-links">
            <h5>Liens Utiles</h5>
            <ul>
              <li><a href="/">Accueil</a></li>
              <li><a href="/market">Marché</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section footer-contact">
            <h5>Contactez-nous</h5>
            <ul>
              <li><a href="tel:+221123456789">+221 12 34 56 78 9</a></li>
              <li><a href="mailto:info@marcheagricole.com">info@marcheagricole.com</a></li>
            </ul>
          </div>
          <div className="footer-section footer-social">
            <h5>Suivez-nous</h5>
            <ul className="social-icons">
              <li>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="" alt="Facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="" alt="Twitter" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="" alt="Instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-container">
          <p>© 2024 Marché Agricole. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
