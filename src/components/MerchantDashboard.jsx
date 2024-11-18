import React, { useState } from 'react';
import './MerchantDashboard.css';

function MerchantDashboard() {
  const [sectionCourante, setSectionCourante] = useState('catalogue');
  const [panier, setPanier] = useState([]);
  const [produits, setProduits] = useState([
    { id: 1, nom: "Tomates bio", prix: 2.99, stock: 50, image: "https://example.com/tomatoes.jpg" },
    { id: 2, nom: "Pommes Gala", prix: 1.99, stock: 100, image: "https://example.com/apples.jpg" },
    { id: 3, nom: "Carottes", prix: 1.49, stock: 75, image: "https://example.com/carrots.jpg" },
    { id: 4, nom: "Laitue", prix: 0.99, stock: 30, image: "https://example.com/lettuce.jpg" },
    { id: 5, nom: "Fromage de chèvre", prix: 3.99, stock: 25, image: "https://example.com/goat-cheese.jpg" },
    { id: 6, nom: "Miel local", prix: 5.99, stock: 40, image: "https://example.com/honey.jpg" }
  ]);

  const chargerSection = (section) => setSectionCourante(section);

  const ajouterAuPanier = (produitId) => {
    const produit = produits.find(p => p.id === produitId);
    if (produit && produit.stock > 0) {
      setPanier([...panier, produit]);
      setProduits(produits.map(p => 
        p.id === produitId ? { ...p, stock: p.stock - 1 } : p
      ));
    }
  };

  const passerCommande = () => {
    alert(`Commande passée avec succès ! Total: ${panier.reduce((somme, item) => somme + item.prix, 0).toFixed(2)} €`);
    setPanier([]);
    chargerSection('catalogue');
  };

  const mettreAJourStock = (produitId) => {
    const nouveauStock = parseInt(prompt(`Entrez le nouveau stock pour ${produits.find(p => p.id === produitId).nom}:`));
    if (!isNaN(nouveauStock)) {
      setProduits(produits.map(p => 
        p.id === produitId ? { ...p, stock: nouveauStock } : p
      ));
    }
  };

  return (
    <div className="espace-marchand">
      
      
      <main className="dashboard container">
        <aside className="sidebar">
          <h2>Menu</h2>
          <ul>
            <li><button onClick={() => chargerSection('catalogue')}>Catalogue des produits</button></li>
            <li><button onClick={() => chargerSection('commandes')}>Mes commandes</button></li>
            <li><button onClick={() => chargerSection('stock')}>Gestion du stock</button></li>
            <li><button onClick={() => chargerSection('statistiques')}>Statistiques de vente</button></li>
            <li><button onClick={() => chargerSection('parametres')}>Paramètres du compte</button></li>
          </ul>
        </aside>

        <section className="content">
          {sectionCourante === 'catalogue' && (
            <div>
              <h2>Catalogue des produits</h2>
              <div className="product-list">
                {produits.map(produit => (
                  <div key={produit.id} className="product-card">
                    <img src={produit.image} alt={produit.nom} />
                    <h3>{produit.nom}</h3>
                    <p>Prix: {produit.prix.toFixed(2)} €</p>
                    <p>Stock: {produit.stock}</p>
                    <button onClick={() => ajouterAuPanier(produit.id)} className="btn">Ajouter au panier</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sectionCourante === 'commandes' && (
            <div>
              <h2>Mes commandes</h2>
              <ul>
                {panier.map((item, index) => (
                  <li key={index}>{item.nom} - {item.prix.toFixed(2)} €</li>
                ))}
              </ul>
              <button onClick={passerCommande} className="btn">Passer la commande</button>
            </div>
          )}

          {sectionCourante === 'stock' && (
            <div>
              <h2>Gestion du stock</h2>
              <table>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Stock actuel</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {produits.map(produit => (
                    <tr key={produit.id}>
                      <td>{produit.nom}</td>
                      <td>{produit.stock}</td>
                      <td>
                        <button onClick={() => mettreAJourStock(produit.id)} className="btn">Mettre à jour</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {sectionCourante === 'statistiques' && (
            <div>
              <h2>Statistiques de vente</h2>
              <p>Les statistiques de vente seront bientôt disponibles.</p>
            </div>
          )}

          {sectionCourante === 'parametres' && (
            <div>
              <h2>Paramètres du compte</h2>
              <p>Paramètres du compte à configurer.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default MerchantDashboard;
