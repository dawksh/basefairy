"use client"

import { ReactNode } from "react"

import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    baseSepolia,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";


export default function RainbowKitLayout({ children }: { children: ReactNode }) {
    const config = getDefaultConfig({
        appName: 'basefairy',
        projectId: String(process.env.NEXT_PUBLIC_PROJECT_ID),
        chains: [baseSepolia],
        ssr: false,
    });
    const queryClient = new QueryClient();
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

