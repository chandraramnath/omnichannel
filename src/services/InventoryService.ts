import { InventoryItem } from '@/types';
import { DemoConfig } from '@/config/types';

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class InventoryService {
    private config: DemoConfig;

    constructor(config: DemoConfig) {
        this.config = config;
    }

    async getStock(productId: string, variantId: string, storeId: string): Promise<number> {
        await delay(300); // Simulate latency

        // In a real app, this would fetch from Azure Cosmos DB
        // For demo, we parse the static config or a local state
        const product = this.config.products.find(p => p.id === productId);
        if (!product) return 0;

        const variant = product.variants?.find(v => v.id === variantId);
        if (!variant) return 0;

        // For the demo, we'll assume the 'stock' in config is the "Online" stock
        // and we'll randomize store stock or derive it
        // Simple logic: If online stock > 0, stores have some stock too for the demo
        return variant.stock > 0 ? Math.floor(Math.random() * 5) + 1 : 0;
    }

    async getAvailableStores(productId: string, variantId: string): Promise<string[]> {
        await delay(300);
        // Return all stores that have stock
        // For demo simplicity, assume all stores have stock if the item is available
        return this.config.stores.map(s => s.id);
    }
}
