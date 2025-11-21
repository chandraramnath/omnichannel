'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DemoConfig } from '@/config/types';
import { fashionConfig } from '@/config/fashion';
import { groceryConfig } from '@/config/grocery';

interface DemoContextType {
    config: DemoConfig;
    setConfigId: (id: string) => void;
    availableConfigs: DemoConfig[];
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const configs: Record<string, DemoConfig> = {
    'fashion-v1': fashionConfig,
    'grocery-v1': groceryConfig,
};

export function DemoProvider({ children }: { children: ReactNode }) {
    const [activeConfigId, setActiveConfigId] = useState<string>('fashion-v1');
    const [config, setConfig] = useState<DemoConfig>(fashionConfig);

    useEffect(() => {
        if (configs[activeConfigId]) {
            setConfig(configs[activeConfigId]);
            // Update CSS variables for theme
            const root = document.documentElement;
            root.style.setProperty('--primary', configs[activeConfigId].theme.primaryColor);
            root.style.setProperty('--secondary', configs[activeConfigId].theme.secondaryColor);
        }
    }, [activeConfigId]);

    return (
        <DemoContext.Provider
            value={{
                config,
                setConfigId: setActiveConfigId,
                availableConfigs: Object.values(configs),
            }}
        >
            {children}
        </DemoContext.Provider>
    );
}

export function useDemo() {
    const context = useContext(DemoContext);
    if (context === undefined) {
        throw new Error('useDemo must be used within a DemoProvider');
    }
    return context;
}
