// PaymentPage.js
import { QRCodeCanvas } from 'qrcode.react'; // Utilisez QRCodeCanvas
import { useContext } from 'react';
import { CartContext } from './CartContext';
import './PaymentPage.css';

function PaymentPage() {
  const { cartItems } = useContext(CartContext);

  // Calcul du sous-total
  const subtotal = cartItems.reduce((acc, item) => acc + item.prix * item.quantity, 0);
  const shipping = 2000;
  const total = subtotal + shipping;

  // Informations encodées dans le QR Code
  const qrCodeData = `Montant total : ${total} FCFA`;

  return (
    <div className="payment-page">
      <h1>Page de Paiement</h1>
      <div className="payment-summary">
        <p>Sous-total : <span>{subtotal} FCFA</span></p>
        <p>Frais de livraison : <span>{shipping} FCFA</span></p>
        <p>Total : <span>{total} FCFA</span></p>
      </div>

      <div className="qr-code-section">
        <h2>Scannez pour payer</h2>
        <QRCodeCanvas value={qrCodeData} size={200} /> {/* Utilisez QRCodeCanvas */}
      </div>

      <button className="confirm-payment-btn">Confirmer le paiement</button>
    </div>
  );
}

export default PaymentPage;
