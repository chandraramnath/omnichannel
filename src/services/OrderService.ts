import { Order, OrderStatus, CartItem } from '@/types';

// In-memory storage for the demo session
let orders: Order[] = [];

export class OrderService {
    private readonly STORAGE_KEY = 'omnichannel_demo_orders';

    private getOrders(): Order[] {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    private saveOrders(orders: Order[]) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
    }

    async createOrder(customer: { name: string; email: string }, items: CartItem[], storeId: string): Promise<Order> {
        const orders = this.getOrders();
        const newOrder: Order = {
            id: `ORD-${Math.floor(Math.random() * 10000)}`,
            customerName: customer.name,
            customerEmail: customer.email,
            storeId,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            items: items.map(item => ({
                productId: item.product.id,
                variantId: item.variantId,
                productName: item.product.name,
                quantity: item.quantity,
                price: item.product.price,
                image: item.product.image,
            })),
            totalAmount: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        };

        orders.push(newOrder);
        this.saveOrders(orders);
        return newOrder;
    }

    async getOrdersByStore(storeId: string): Promise<Order[]> {
        const orders = this.getOrders();
        return orders.filter(o => o.storeId === storeId);
    }

    async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (!order) return null;

        order.status = status;
        this.saveOrders(orders);
        return order;
    }

    async getOrder(orderId: string): Promise<Order | null> {
        const orders = this.getOrders();
        return orders.find(o => o.id === orderId) || null;
    }
}

export const orderService = new OrderService();
