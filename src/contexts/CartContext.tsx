'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, color: string, size: string) => void;
  updateQuantity: (id: string, color: string, size: string, quantity: number) => void;
  getTotal: () => number;
  setMiniCartOpen: (open: boolean) => void;
  miniCartOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        item => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...currentItems, newItem];
      }
    });
    setMiniCartOpen(true); // Open MiniCart when item is added
  }, []);

  const removeItem = useCallback((id: string, color: string, size: string) => {
    setItems(currentItems =>
      currentItems.filter(item => 
        !(item.id === id && item.color === color && item.size === size)
      )
    );
  }, []);

  const updateQuantity = useCallback((id: string, color: string, size: string, quantity: number) => {
    setItems(currentItems => {
      if (quantity === 0) {
        return currentItems.filter(item => 
          !(item.id === id && item.color === color && item.size === size)
        );
      }

      return currentItems.map(item =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      );
    });
  }, []);

  const getTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    getTotal,
    setMiniCartOpen,
    miniCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
