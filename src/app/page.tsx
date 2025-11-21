'use client';

import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { ShoppingBag, Store, Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Home() {
  const { config, setConfigId, availableConfigs } = useDemo();
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            {config.name}
          </h1>
          <p className="text-lg text-slate-600">
            Omnichannel Retail Experience Demo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer App Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <ShoppingBag size={32} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Customer App</h2>
              <p className="text-slate-500 mt-1">
                Shop online, browse inventory, and place BOPIS orders.
              </p>
            </div>
            <Link href="/products" className="w-full">
              <Button className="w-full" size="lg">
                Launch Customer View
              </Button>
            </Link>
          </div>

          {/* Associate App Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <Store size={32} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Store Associate App</h2>
              <p className="text-slate-500 mt-1">
                Manage orders, fulfill pickups, and assist customers.
              </p>
            </div>
            <Link href="/dashboard" className="w-full">
              <Button variant="outline" className="w-full" size="lg">
                Launch Associate View
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center pt-8 relative">
          <Button
            variant="ghost"
            className="text-slate-400 hover:text-slate-600"
            onClick={() => setShowConfig(!showConfig)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Configure Demo
          </Button>

          {showConfig && (
            <div className="absolute bottom-14 bg-white p-2 rounded-lg shadow-xl border border-slate-200 w-64 animate-in fade-in slide-in-from-bottom-2">
              <div className="text-xs font-semibold text-slate-500 px-3 py-2 uppercase tracking-wider">
                Select Demo Profile
              </div>
              <div className="space-y-1">
                {availableConfigs.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setConfigId(c.id);
                      setShowConfig(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${config.id === c.id
                        ? 'bg-slate-100 text-slate-900 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <span>{c.name}</span>
                    {config.id === c.id && <Check size={14} className="text-[var(--primary)]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
