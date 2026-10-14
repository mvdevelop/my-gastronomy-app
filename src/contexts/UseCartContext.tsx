import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem } from '../types/domain';

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: CartItem | Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItems: (items: CartItem[]) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (itemToAdd: CartItem | Omit<CartItem, 'quantity'>) => {
    if (!itemToAdd?._id) return;
    setCartItems((currentItems) => {
      if (currentItems.some((item) => item._id === itemToAdd._id)) return currentItems;
      return [...currentItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item._id !== itemId));
  };

  const updateCartItems = (items: CartItem[]) => {
    setCartItems(items.map((item) => ({ ...item, quantity: Math.max(1, Number(item.quantity) || 1) })));
  };

  const clearCart = () => setCartItems([]);

  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItems, clearCart }}>{children}</CartContext.Provider>;
}

export function UseCartContext(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('UseCartContext must be used inside CartProvider');
  return context;
}
