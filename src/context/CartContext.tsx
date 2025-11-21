'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, variantId: string) => void;
    removeFromCart: (variantId: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product, variantId: string) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.variantId === variantId);
            if (existing) {
                return prev.map((i) =>
                    i.variantId === variantId ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { product, variantId, quantity: 1 }];
        });
    };

    const removeFromCart = (variantId: string) => {
        setItems((prev) => prev.filter((i) => i.variantId !== variantId));
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                clearCart,
                totalItems,
                totalAmount,
            }}
        >
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
