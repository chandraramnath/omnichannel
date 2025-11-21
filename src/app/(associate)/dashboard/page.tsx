'use client';

import { useEffect, useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { orderService } from '@/services/OrderService';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Package, CheckCircle, Clock, RefreshCw, ScanLine } from 'lucide-react';
import Link from 'next/link';

export default function AssociateDashboard() {
    const { config } = useDemo();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'PENDING' | 'READY_FOR_PICKUP' | 'COMPLETED'>('PENDING');

    // For demo, we'll default to the first store in the config
    const storeId = config.stores[0]?.id;

    const fetchOrders = async () => {
        if (!storeId) return;
        setLoading(true);
        const data = await orderService.getOrdersByStore(storeId);
        setOrders(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
        // Poll for new orders every 5 seconds
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [storeId]);

    const filteredOrders = orders.filter(o => {
        if (activeTab === 'PENDING') return o.status === 'PENDING' || o.status === 'CONFIRMED';
        return o.status === activeTab;
    });

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    {[
                        { id: 'PENDING', label: 'To Pack', icon: Clock },
                        { id: 'READY_FOR_PICKUP', label: 'Ready for Pickup', icon: Package },
                        { id: 'COMPLETED', label: 'Completed', icon: CheckCircle },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-[var(--primary)] text-white shadow-md'
                                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                }`}
                        >
                            <tab.icon size={16} />
                            <span>{tab.label}</span>
                            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                {orders.filter(o => {
                                    if (tab.id === 'PENDING') return o.status === 'PENDING' || o.status === 'CONFIRMED';
                                    return o.status === tab.id;
                                }).length}
                            </span>
                        </button>
                    ))}
                    <Button variant="ghost" size="icon" onClick={fetchOrders} className="ml-auto">
                        <RefreshCw size={18} />
                    </Button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                {/* Order List */}
                <div className="space-y-4">
                    {loading && orders.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">Loading orders...</div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                            <p className="text-slate-500">No orders in this queue.</p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <Link href={`/order/${order.id}`} key={order.id}>
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer mb-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{order.customerName}</h3>
                                            <p className="text-xs text-slate-500">Order #{order.id}</p>
                                        </div>
                                        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                            {new Date(order.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center space-x-2 min-w-max">
                                                <div className="h-10 w-10 bg-slate-100 rounded-md overflow-hidden relative">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={item.image} alt={item.productName} className="object-cover h-full w-full" />
                                                </div>
                                                <div className="text-sm">
                                                    <p className="text-slate-900 font-medium">{item.quantity}x {item.productName}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                                        <span className="font-medium text-slate-900">${order.totalAmount.toFixed(2)}</span>
                                        <span className="text-sm text-[var(--primary)] font-medium">View Details →</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
