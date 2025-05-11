"use client";

import Image from "next/image";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider, createClient } from "wagmi";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { monadTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"; // Menambahkan RPC URL custom
import MainPage from "./mainpage";

// Menyusun client Wagmi dengan konfigurasi untuk Monad Testnet
const { chains, provider, webSocketProvider } = configureChains(
  [monadTestnet], // Menambahkan Monad Testnet ke dalam daftar jaringan
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://testnet-rpc.monad.xyz`, // RPC URL untuk Monad Testnet
      }),
    }),
  ]
);

// Membuat client wagmi dengan konfigurasi jaringan dan provider
const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

// Konfigurasi RainbowKit
const config = getDefaultConfig({
  appName: "Vault dApp",  // Nama aplikasi kamu
  chains,  // Gunakan chains yang sudah dikonfigurasi
});

const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiProvider client={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains} {...config}>
          <MainPage />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
