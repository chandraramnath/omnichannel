import { DemoConfig } from './types';

export const fashionConfig: DemoConfig = {
    id: 'fashion-v1',
    name: 'Luxe Fashion',
    theme: {
        name: 'Luxe',
        primaryColor: '#0f172a', // Slate 900
        secondaryColor: '#db2777', // Pink 600
        logo: '/logos/fashion-logo.png',
        fontFamily: 'Inter, sans-serif',
    },
    features: {
        bopis: true,
        endlessAisle: true,
    },
    stores: [
        {
            id: 'store-001',
            name: 'Downtown Flagship',
            address: '123 Fashion Ave, New York, NY',
            coordinates: { lat: 40.7128, lng: -74.0060 },
            workingHours: '10:00 AM - 9:00 PM',
        },
        {
            id: 'store-002',
            name: 'Westside Mall',
            address: '456 West St, New York, NY',
            coordinates: { lat: 40.7500, lng: -74.0000 },
            workingHours: '10:00 AM - 8:00 PM',
        },
    ],
    products: [
        {
            id: 'prod-001',
            name: 'Classic Trench Coat',
            description: 'A timeless beige trench coat for any occasion.',
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
            category: 'Outerwear',
            variants: [
                { id: 'var-001-s', name: 'Small', sku: 'TC-BEIGE-S', stock: 5 },
                { id: 'var-001-m', name: 'Medium', sku: 'TC-BEIGE-M', stock: 2 },
                { id: 'var-001-l', name: 'Large', sku: 'TC-BEIGE-L', stock: 0 }, // Out of stock for Endless Aisle demo
            ],
        },
        {
            id: 'prod-002',
            name: 'Silk Evening Gown',
            description: 'Elegant red silk gown.',
            price: 450.00,
            image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
            category: 'Dresses',
            variants: [
                { id: 'var-002-s', name: 'Small', sku: 'SG-RED-S', stock: 10 },
                { id: 'var-002-m', name: 'Medium', sku: 'SG-RED-M', stock: 8 },
            ],
        },
        {
            id: 'prod-003',
            name: 'Leather Crossbody Bag',
            description: 'Genuine leather bag with gold hardware.',
            price: 150.00,
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
            category: 'Accessories',
            variants: [
                { id: 'var-003-one', name: 'One Size', sku: 'LB-BLACK', stock: 15 },
            ],
        },
    ],
};
