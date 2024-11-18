import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmerDashboard.css';
import { useNavigate } from 'react-router-dom';
import AddProductForm from '../components/AddProductForm';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [commandes, setCommandes] = useState([]); // Initialiser commandes en tant que tableau vide
  const [loadingCommandes, setLoadingCommandes] = useState(true);

  useEffect(() => {
    const fetchedProducts = [
      { id: 1, name: "Tomates bio", price: 2.99, image: "src/images/image6.png" },
      { id: 2, name: "Courgettes", price: 1.99, image: "src/images/image7.png" },
      { id: 3, name: "Aubergines", price: 2.49, image: "src/images/image8.png" },
      { id: 4, name: "Poivrons", price: 3.29, image: "src/images/image9.png" },
    ];
    setProducts(fetchedProducts);
  }, []);

  useEffect(() => {
    if (activeTab === 'orders') {
      const fetchCommandes = async () => {
        try {
          const response = await axios.get('/api/commandes/fermier');
          setCommandes(Array.isArray(response.data) ? response.data : []); // Vérification de type tableau
        } catch (error) {
          console.error('Erreur lors du chargement des commandes', error);
          setCommandes([]); // En cas d'erreur, on s'assure que commandes est un tableau vide
        } finally {
          setLoadingCommandes(false);
        }
      };
      fetchCommandes();
    }
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <div className="tab-content active">
            <h3>Mes Produits</h3>
            <button className="btn" style={{ marginBottom: '20px' }} onClick={handleAddProductClick}>Ajouter un nouveau produit</button>
            {showAddProductForm && <AddProductForm />}
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-card animate-fade-in">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{product.price.toFixed(2)} €</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="tab-content active">
            <h3>Commandes en cours</h3>
            {loadingCommandes ? (
              <p>Chargement des commandes...</p>
            ) : (
              <div className="commandes-list">
                {commandes.length > 0 ? (
                  commandes.map((commande) => (
                    <div key={commande.id} className="commande-card">
                      <p><strong>Produit :</strong> {commande.produit.nom}</p>
                      <p><strong>Quantité :</strong> {commande.quantite}</p>
                      <p><strong>Client :</strong> {commande.client.nom}</p>
                      <p><strong>Date :</strong> {new Date(commande.date).toLocaleDateString()}</p>
                      <p><strong>Statut :</strong> {commande.statut}</p>
                    </div>
                  ))
                ) : (
                  <p>Aucune commande trouvée.</p>
                )}
              </div>
            )}
          </div>
        );
      case 'stats':
        return (
          <div className="tab-content active">
            <h3>Statistiques de vente</h3>
          </div>
        );
      default:
        return null;
    }
  };

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    setShowAddProductForm(true);
  };

  return (
    <div>
      <main className="main-content container">
        <div className="profile-container">
          <aside className="profile-sidebar">
            <img src="src/images/4629641.jpg" alt="Photo de profil" className="profile-image" />
            <h2 className="profile-name">Momo Sylla</h2>
            <div className="profile-info">
              <p><strong>Localisation:</strong> Dakar, Sénégal</p>
              <p><strong>Type de culture:</strong> Maraîchage biologique</p>
              <p><strong>Membre depuis:</strong> 2020</p>
            </div>
            <button className="btn">Modifier le profil</button>
          </aside>

          <section className="profile-main">
            <div className="tab-container">
              <button className={`tab-button ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>Mes Produits</button>
              <button className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Commandes</button>
              <button className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>Statistiques</button>
            </div>
            {renderTabContent()}
          </section>
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;
