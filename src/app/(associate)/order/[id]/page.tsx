'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { orderService } from '@/services/OrderService';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Package, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function AssociateOrderDetails() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (params.id) {
            orderService.getOrder(params.id as string).then((data) => {
                setOrder(data);
                setLoading(false);
            });
        }
    }, [params.id]);

    const handleStatusUpdate = async (status: 'READY_FOR_PICKUP' | 'COMPLETED') => {
        if (!order) return;
        await orderService.updateOrderStatus(order.id, status);
        const updated = await orderService.getOrder(order.id);
        setOrder(updated);
    };

    const simulateScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            handleStatusUpdate('COMPLETED');
        }, 2000);
    };

    if (loading || !order) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center space-x-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="font-bold text-slate-900">Order #{order.id}</h1>
                        <p className="text-xs text-slate-500">{order.customerName}</p>
                    </div>
                    <div className="ml-auto">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                order.status === 'READY_FOR_PICKUP' ? 'bg-blue-100 text-blue-700' :
                                    'bg-yellow-100 text-yellow-700'
                            }`}>
                            {order.status.replace(/_/g, ' ')}
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {/* Items List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="font-semibold text-slate-900 flex items-center">
                            <Package className="mr-2 h-4 w-4" />
                            Items to Pack ({order.items.length})
                        </h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="p-4 flex gap-4">
                                <div className="h-16 w-16 bg-slate-100 rounded-md overflow-hidden relative flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.image} alt={item.productName} className="object-cover h-full w-full" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">{item.productName}</p>
                                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                    <p className="text-sm text-slate-500">SKU: {item.variantId}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:static md:bg-transparent md:border-0 md:p-0">
                    <div className="max-w-3xl mx-auto">
                        {order.status === 'PENDING' || order.status === 'CONFIRMED' ? (
                            <Button
                                className="w-full h-12 text-lg"
                                onClick={() => handleStatusUpdate('READY_FOR_PICKUP')}
                            >
                                Mark Ready for Pickup
                            </Button>
                        ) : order.status === 'READY_FOR_PICKUP' ? (
                            <div className="space-y-3">
                                <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm mb-4">
                                    Customer has arrived. Scan their QR code to complete the handover.
                                </div>
                                <Button
                                    className="w-full h-12 text-lg"
                                    onClick={simulateScan}
                                    disabled={isScanning}
                                >
                                    {isScanning ? (
                                        <span className="flex items-center">
                                            <QrCode className="mr-2 h-5 w-5 animate-pulse" />
                                            Scanning...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <QrCode className="mr-2 h-5 w-5" />
                                            Scan Customer QR
                                        </span>
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-green-50 p-4 rounded-lg text-green-800 flex items-center justify-center">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Order Completed
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
