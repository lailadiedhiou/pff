import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>,
  document.getElementById('root')
);
