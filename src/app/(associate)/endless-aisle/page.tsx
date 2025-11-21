'use client';

import { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Search, ScanLine, ShoppingCart, Truck, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EndlessAislePage() {
    const { config } = useDemo();
    const { addToCart, totalItems } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        // Simulate search
        const results = config.products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.variants?.some(v => v.sku.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        setSearchResults(results);
        setHasSearched(true);
    };

    const simulateScan = () => {
        // Simulate scanning a specific item (e.g., the first one)
        setSearchQuery('Coat');
        // Trigger search automatically
        const results = config.products.filter(p => p.name.toLowerCase().includes('coat'));
        setSearchResults(results);
        setHasSearched(true);
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="font-bold text-slate-900 flex items-center">
                        <ScanLine className="mr-2 h-5 w-5 text-[var(--primary)]" />
                        Endless Aisle
                    </h1>
                    <Link href="/checkout">
                        <Button variant="ghost" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-[var(--primary)] text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {/* Search/Scan Bar */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Scan barcode or search SKU..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Search</Button>
                        <Button type="button" variant="outline" onClick={simulateScan}>
                            <ScanLine className="h-4 w-4" />
                        </Button>
                    </form>
                </div>

                {/* Results */}
                {hasSearched && (
                    <div className="space-y-4">
                        <h2 className="font-semibold text-slate-900">Search Results ({searchResults.length})</h2>
                        {searchResults.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">No products found.</div>
                        ) : (
                            searchResults.map((product) => (
                                <div key={product.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                                    <div className="h-24 w-24 bg-slate-100 rounded-md overflow-hidden relative flex-shrink-0">
                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                                                <p className="text-sm text-slate-500">{product.category}</p>
                                            </div>
                                            <span className="font-medium text-slate-900">${product.price.toFixed(2)}</span>
                                        </div>

                                        {/* Variants */}
                                        <div className="space-y-2">
                                            {product.variants?.map((variant: any) => (
                                                <div key={variant.id} className="flex items-center justify-between bg-slate-50 p-2 rounded text-sm">
                                                    <span className="font-medium text-slate-700">{variant.name}</span>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${variant.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {variant.stock > 0 ? `${variant.stock} In Stock` : 'Out of Stock'}
                                                        </span>
                                                        <Button
                                                            size="sm"
                                                            variant={variant.stock > 0 ? "outline" : "default"}
                                                            onClick={() => addToCart(product, variant.id)}
                                                        >
                                                            {variant.stock > 0 ? 'Add to Cart' : (
                                                                <span className="flex items-center">
                                                                    <Truck className="mr-1 h-3 w-3" /> Ship to Home
                                                                </span>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
