'use client';

import { useDemo } from '@/context/DemoContext';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
    const { config } = useDemo();
    const { totalItems } = useCart();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="text-xl font-bold text-slate-900">{config.name}</h1>
                    </div>

                    <Link href="/checkout">
                        <Button variant="outline" className="relative">
                            <ShoppingBag className="h-5 w-5 mr-2" />
                            Cart
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {config.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </div>
    );
}
