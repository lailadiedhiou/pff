import { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext); // Ajoutez removeFromCart ici
  const navigate = useNavigate();

  const handleOrder = () => {
    alert('Commande confirmée !');
     navigate('/payment'); // Décommentez pour rediriger vers la page de paiement
  };

  // Calculer le sous-total
  const subtotal = cartItems.reduce((acc, item) => acc + item.prix * item.quantity, 0);
  const shipping = 2000; // Frais de livraison fixe pour cet exemple
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="panier">
        <h1>Votre Panier</h1>
      </div>

      {cartItems.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.nom}</td>
                  <td>{item.quantity}</td>
                  <td>{item.prix} FCFA</td>
                  <td>{item.prix * item.quantity} FCFA</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)} className="button-rouge">Retirer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          <div className="cart-summary">
            <p>Sous-total: <span>{subtotal} FCFA</span></p>
            <p>Frais de livraison: <span>{shipping} FCFA</span></p>
            <p>Total: <span>{total} FCFA</span></p>
            <button onClick={handleOrder} className="checkout-btn">Passer à la caisse</button>
          </div>
        </>
      ) : (
        <p>Votre panier est vide</p>
      )}
    </div>
  );
}

export default CartPage;
