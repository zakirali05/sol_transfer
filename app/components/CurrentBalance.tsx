"use client";
import React from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const CurrentBalanceComp = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const updateBalance = async () => {
      try {
        connection.onAccountChange(
          publicKey!,
          (updatedAccountInfo) => {
            setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
          },
          "confirmed"
        );

        const accountInfo = await connection.getAccountInfo(publicKey!);

        if (accountInfo) {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        } else {
          // alert("Account info not found");
        }
      } catch (error) {
        // alert("Failed to retrieve account info:");
        console.log(error);
      }
    };

    updateBalance();
  }, [connection, publicKey]);
  if (!publicKey) {
    return null;
  }
  return (
    <p className="text-end font-bold text-sm pr-4 uppercase">
      your balance : {balance} SOL
    </p>
  );
};

export default CurrentBalanceComp;
