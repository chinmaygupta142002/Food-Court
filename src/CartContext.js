import React, { createContext, useState, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap your application with
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Function to add an item to the cart
  const addToCart = (item, quantity) => {
    const newItem = { ...item, quantity };
    setCartItems([...cartItems, newItem]);
  };
  
  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter(cartItem => cartItem !== item);
    setCartItems(updatedCart);
  };
  
  // Function to calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Context value
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    calculateTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

