import React from 'react';
import './Sidebar.css';
import { FaHome, FaSeedling, FaShoppingCart, FaBell, FaUser } from 'react-icons/fa';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <ul className="sidebar-menu">
        <li><a href="#stats" onClick={toggleSidebar}><FaHome className="icon" />Résumé des Activités</a></li>
        <li><a href="#products" onClick={toggleSidebar}><FaSeedling className="icon" />Gérer les Produits</a></li>
        <li><a href="#orders" onClick={toggleSidebar}><FaShoppingCart className="icon" />Commandes Reçues</a></li>
        <li><a href="#support" onClick={toggleSidebar}><FaBell className="icon" />Notifications & Support</a></li>
        <li><a href="#profile" onClick={toggleSidebar}><FaUser className="icon" />Mon Profil</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
