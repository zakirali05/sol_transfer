"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

const WalletProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const endpoint = clusterApiUrl("devnet");

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

export default WalletProviderComponent;
