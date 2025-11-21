import { DemoConfig } from './types';

export const groceryConfig: DemoConfig = {
    id: 'grocery-v1',
    name: 'Fresh Market',
    theme: {
        name: 'Fresh',
        primaryColor: '#166534', // Green 700
        secondaryColor: '#ca8a04', // Yellow 600
        logo: '/logos/grocery-logo.png',
        fontFamily: 'Inter, sans-serif',
    },
    features: {
        bopis: true,
        endlessAisle: true,
    },
    stores: [
        {
            id: 'store-g01',
            name: 'Uptown Market',
            address: '789 Market St, San Francisco, CA',
            coordinates: { lat: 37.7749, lng: -122.4194 },
            workingHours: '7:00 AM - 10:00 PM',
        },
        {
            id: 'store-g02',
            name: 'Bayside Grocers',
            address: '101 Bay Blvd, San Francisco, CA',
            coordinates: { lat: 37.8044, lng: -122.2711 },
            workingHours: '8:00 AM - 9:00 PM',
        },
    ],
    products: [
        {
            id: 'prod-g01',
            name: 'Organic Bananas',
            description: 'Fresh organic bananas, bunch of 5-7.',
            price: 2.99,
            image: 'https://images.unsplash.com/photo-1603833665858-e61d17a8622e?auto=format&fit=crop&w=800&q=80',
            category: 'Produce',
            variants: [
                { id: 'var-g01-bunch', name: 'Bunch', sku: 'BAN-ORG', stock: 50 },
            ],
        },
        {
            id: 'prod-g02',
            name: 'Sourdough Bread',
            description: 'Artisan sourdough bread, baked fresh daily.',
            price: 5.49,
            image: 'https://images.unsplash.com/photo-1585476263060-b7a6ec32983b?auto=format&fit=crop&w=800&q=80',
            category: 'Bakery',
            variants: [
                { id: 'var-g02-loaf', name: 'Loaf', sku: 'BRD-SOUR', stock: 12 },
            ],
        },
        {
            id: 'prod-g03',
            name: 'Whole Milk',
            description: 'Organic whole milk, 1 gallon.',
            price: 4.99,
            image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
            category: 'Dairy',
            variants: [
                { id: 'var-g03-gal', name: 'Gallon', sku: 'MILK-WH', stock: 20 },
            ],
        },
    ],
};
