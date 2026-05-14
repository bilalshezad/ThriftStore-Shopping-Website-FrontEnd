import React, { useState, useEffect } from 'react';
import { CartContext } from './CartContextProvider';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const uniqueId = `${product._id}-${product.selectedSize || 'no-size'}`;
      const existingItem = prev.find(item => item.uniqueId === uniqueId);
      if (existingItem) {
        return prev.map(item =>
          item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, id: product._id, uniqueId, quantity: 1 }];
    });
  };

  const updateQuantity = (uniqueId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(uniqueId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.uniqueId === uniqueId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (uniqueId) => {
    setCartItems(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalPrice,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
