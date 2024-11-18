import React from 'react';

function FarmerDashboard() {
  return (
    <div>
      <h1>Tableau de Bord Consommateur</h1>
      <button>Acheter un produit</button>
      {/* Liste des produits ajoutés par l'agriculteur */}
      <div>
        <p>Produit A - Quantité: 10 - Prix: 5€</p>
        <button>Editer</button>
        <button>Supprimer</button>
      </div>
    </div>
  );
}

export default FarmerDashboard;
