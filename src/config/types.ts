export interface ThemeConfig {
    name: string;
    primaryColor: string;
    secondaryColor: string;
    logo: string; // URL or path
    fontFamily: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    variants?: {
        id: string;
        name: string; // e.g., "Size M", "Red"
        sku: string;
        stock: number;
    }[];
}

export interface Store {
    id: string;
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    workingHours: string;
}

export interface DemoConfig {
    id: string;
    name: string; // e.g., "Fashion Demo"
    theme: ThemeConfig;
    products: Product[];
    stores: Store[];
    features: {
        bopis: boolean;
        endlessAisle: boolean;
    };
}
