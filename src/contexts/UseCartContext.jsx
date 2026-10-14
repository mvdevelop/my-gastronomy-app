
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [ cartItems, setCartItems ] = useState([]);

    const addToCart = (itemToAdd) => {
        if (!itemToAdd?._id) return;

        setCartItems((currentItems) => {
            if (currentItems.some((cartItem) => cartItem._id === itemToAdd._id)) {
                return currentItems;
            }
            return [...currentItems, { ...itemToAdd, quantity: 1 }];
        });
    }

    const removeFromCart = (itemId) => {
        const cartItemsSanitized = cartItems.filter((item) => {
            return item._id !== itemId
        });
        
        setCartItems(cartItemsSanitized);
    }

    const updateCartItems = (items) => {
        if (!Array.isArray(items)) return;
        setCartItems(items.map((item) => ({ ...item, quantity: Math.max(1, Number(item.quantity) || 1) })));
    }

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ removeFromCart, addToCart, cartItems, updateCartItems, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const UseCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('UseCartContext must be used inside CartProvider');
    }

    return context;
}
