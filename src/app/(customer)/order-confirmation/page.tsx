'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { orderService } from '@/services/OrderService';
import { Order } from '@/types';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OrderConfirmationPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (orderId) {
            orderService.getOrder(orderId).then(setOrder);
        }
    }, [orderId]);

    if (!order) {
        return <div className="p-8 text-center">Loading order details...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-green-50 p-8 text-center border-b border-green-100">
                    <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Order Confirmed!</h1>
                    <p className="text-slate-600 mt-2">
                        Your order <span className="font-mono font-medium">#{order.id}</span> has been placed.
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    {/* QR Code Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="bg-white p-4 rounded-xl border-2 border-dashed border-slate-300">
                            <QRCodeSVG value={order.id} size={160} />
                        </div>
                        <p className="text-sm text-center text-slate-500">
                            Show this QR code to the store associate<br />when you pick up your items.
                        </p>
                    </div>

                    {/* Status Timeline */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-900">Order Status</h3>
                        <div className="relative pl-4 border-l-2 border-slate-200 space-y-6">
                            <div className="relative">
                                <div className="absolute -left-[21px] bg-green-500 h-3 w-3 rounded-full border-2 border-white ring-1 ring-green-500" />
                                <p className="text-sm font-medium text-slate-900">Order Placed</p>
                                <p className="text-xs text-slate-500">We've received your order.</p>
                            </div>
                            <div className="relative">
                                <div className={`absolute -left-[21px] h-3 w-3 rounded-full border-2 border-white ring-1 ${order.status === 'READY_FOR_PICKUP' || order.status === 'COMPLETED' ? 'bg-green-500 ring-green-500' : 'bg-slate-200 ring-slate-300'
                                    }`} />
                                <p className="text-sm font-medium text-slate-900">Preparing</p>
                                <p className="text-xs text-slate-500">Store associate is packing your items.</p>
                            </div>
                            <div className="relative">
                                <div className={`absolute -left-[21px] h-3 w-3 rounded-full border-2 border-white ring-1 ${order.status === 'COMPLETED' ? 'bg-green-500 ring-green-500' : 'bg-slate-200 ring-slate-300'
                                    }`} />
                                <p className="text-sm font-medium text-slate-900">Ready for Pickup</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <Link href="/products">
                            <Button variant="outline" className="w-full">Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
