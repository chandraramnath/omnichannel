'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useDemo } from '@/context/DemoContext';
import { orderService } from '@/services/OrderService';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Store, MapPin, CreditCard, Truck } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
    const { items, totalAmount, clearCart } = useCart();
    const { config } = useDemo();
    const router = useRouter();
    const [selectedStoreId, setSelectedStoreId] = useState<string>('');
    const [deliveryMethod, setDeliveryMethod] = useState<'PICKUP' | 'DELIVERY'>('PICKUP');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCheckout = async () => {
        if (deliveryMethod === 'PICKUP' && !selectedStoreId) return;
        setIsSubmitting(true);

        try {
            // Simulate customer data
            const customer = {
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
            };

            // For delivery, we might pass a special storeId or handle it in the service
            // For demo, we'll use the first store as the "fulfillment center" if delivery
            const fulfillmentStoreId = deliveryMethod === 'PICKUP' ? selectedStoreId : config.stores[0].id;

            const order = await orderService.createOrder(customer, items, fulfillmentStoreId);
            clearCart();
            router.push(`/order-confirmation?orderId=${order.id}`);
        } catch (error) {
            console.error('Checkout failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
                <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.variantId} className="flex gap-4">
                                        <div className="relative h-16 w-16 bg-slate-100 rounded-md overflow-hidden">
                                            <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-slate-900">{item.product.name}</h3>
                                            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-medium text-slate-900">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Method & Payment */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-semibold mb-4">Delivery Method</h2>

                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => { setDeliveryMethod('PICKUP'); setSelectedStoreId(config.stores[0]?.id || ''); }}
                                    className={`flex-1 p-4 rounded-lg border text-center transition-all ${deliveryMethod === 'PICKUP'
                                            ? 'border-[var(--primary)] bg-blue-50 ring-1 ring-[var(--primary)]'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <Store className="mx-auto h-6 w-6 mb-2 text-slate-700" />
                                    <span className="font-medium text-slate-900">Store Pickup</span>
                                </button>
                                <button
                                    onClick={() => { setDeliveryMethod('DELIVERY'); setSelectedStoreId(''); }}
                                    className={`flex-1 p-4 rounded-lg border text-center transition-all ${deliveryMethod === 'DELIVERY'
                                            ? 'border-[var(--primary)] bg-blue-50 ring-1 ring-[var(--primary)]'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <Truck className="mx-auto h-6 w-6 mb-2 text-slate-700" />
                                    <span className="font-medium text-slate-900">Home Delivery</span>
                                </button>
                            </div>

                            {deliveryMethod === 'PICKUP' ? (
                                <>
                                    <h3 className="font-medium text-slate-900 mb-3">Select Store</h3>
                                    <div className="space-y-3">
                                        {config.stores.map((store) => (
                                            <div
                                                key={store.id}
                                                onClick={() => setSelectedStoreId(store.id)}
                                                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedStoreId === store.id
                                                        ? 'border-[var(--primary)] bg-blue-50 ring-1 ring-[var(--primary)]'
                                                        : 'border-slate-200 hover:border-slate-300'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-slate-900">{store.name}</h3>
                                                        <p className="text-sm text-slate-500 flex items-center mt-1">
                                                            <MapPin className="h-3 w-3 mr-1" />
                                                            {store.address}
                                                        </p>
                                                    </div>
                                                    {selectedStoreId === store.id && (
                                                        <div className="h-4 w-4 rounded-full bg-[var(--primary)]" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <h3 className="font-medium text-slate-900">Shipping Address</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="First Name" className="p-2 border border-slate-200 rounded w-full" defaultValue="Jane" />
                                        <input type="text" placeholder="Last Name" className="p-2 border border-slate-200 rounded w-full" defaultValue="Doe" />
                                        <input type="text" placeholder="Address" className="col-span-2 p-2 border border-slate-200 rounded w-full" defaultValue="123 Main St" />
                                        <input type="text" placeholder="City" className="p-2 border border-slate-200 rounded w-full" defaultValue="New York" />
                                        <input type="text" placeholder="Zip Code" className="p-2 border border-slate-200 rounded w-full" defaultValue="10001" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button
                            className="w-full h-12 text-lg"
                            onClick={handleCheckout}
                            disabled={isSubmitting || (deliveryMethod === 'PICKUP' && !selectedStoreId)}
                        >
                            {isSubmitting ? 'Processing...' : deliveryMethod === 'PICKUP' ? 'Place Pickup Order' : 'Place Delivery Order'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
