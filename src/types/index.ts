import { Product, Store } from '@/config/types';
export type { Product, Store };

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED';

export interface CartItem {
    product: Product;
    variantId: string;
    quantity: number;
    storeId?: string; // For BOPIS, items might be tied to a specific store availability
}

export interface OrderItem {
    productId: string;
    variantId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
}

export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    storeId: string; // Pickup location
    createdAt: string;
    qrCode?: string; // For pickup verification
}

export interface InventoryItem {
    productId: string;
    variantId: string;
    storeId: string;
    stock: number;
}
