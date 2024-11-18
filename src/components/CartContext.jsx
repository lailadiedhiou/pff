// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children, user }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Vérifiez si user est défini avant d'accéder à user.id
    if (user && user.id) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
      setCartItems(savedCart);
    } else {
      setCartItems([]); // Vider le panier si aucun utilisateur n'est connecté
    }
  }, [user]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      if (user && user.id) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      if (user && user.id) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
