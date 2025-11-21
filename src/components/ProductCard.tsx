'use client';

import Image from 'next/image';
import { Product } from '@/config/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useDemo } from '@/context/DemoContext';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { config } = useDemo();

    // Default to first variant for simple add
    const defaultVariant = product.variants?.[0];

    return (
        <div className="group relative bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square relative bg-slate-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-slate-900">{product.name}</h3>
                        <p className="text-sm text-slate-500">{product.category}</p>
                    </div>
                    <span className="font-medium text-slate-900">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <Button
                    className="w-full mt-2"
                    onClick={() => defaultVariant && addToCart(product, defaultVariant.id)}
                    disabled={!defaultVariant || defaultVariant.stock === 0}
                >
                    {defaultVariant?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
            </div>
        </div>
    );
}
