
import { useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '../types';

const CART_STORAGE_KEY = 'e-commerce-cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        if (newQuantity > product.stock) {
          // Here you might want to show a notification to the user
          alert(`Cannot add more than ${product.stock} items.`);
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          if (newQuantity > 0 && newQuantity <= item.stock) {
            return { ...item, quantity: newQuantity };
          }
           if (newQuantity > item.stock) {
            alert(`Cannot add more than ${item.stock} items.`);
          }
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  }, []);
  
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, cartItemCount, cartTotal };
};
