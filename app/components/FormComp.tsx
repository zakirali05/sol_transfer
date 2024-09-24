"use client";
import { useToast } from "@/hooks/use-toast";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useState } from "react";

const FormComp = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const { connection } = useConnection();
  const { sendTransaction, publicKey } = useWallet();
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const transfer = async () => {
    try {
      setLoading(true);
      if (!publicKey) {
        toast({
          title: "Wallet not connected!",
          description: "Connect your wallet to start tranfering your SOL",
          variant: "destructive",
        });
        return;
      }
      if (address === "") {
        toast({
          title: "Enter Receipents address",
          description: "Enter the address where you want to send the SOL",
          variant: "destructive",
        });
        return;
      }

      if (amount === 0) {
        toast({
          title: "0 SOL can't be transfered",
          description:
            "0 SOL can't be transfered , try something higher than that.",
          variant: "destructive",
        });
        return;
      }
      const transaction = new Transaction();
      const transfer = SystemProgram.transfer({
        fromPubkey: new PublicKey(publicKey!),
        toPubkey: new PublicKey(address),
        lamports: amount! * LAMPORTS_PER_SOL,
      });

      transaction.add(transfer);

      const signature = await sendTransaction(transaction, connection);

      if (signature) {
        toast({
          title: "Success",
          description: `${amount} SOL transfered to account ${address}`,
        });
      }

      return;
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setAddress("");
      setAmount(0);
    }
  };

  return (
    <div className="p-5 flex  items-center flex-col">
      <h2 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-[#9945FF] via-[#549ec8] to-[#14F195] inline-block text-transparent bg-clip-text">
        Transfer Fund
      </h2>
      <div className="flex flex-col gap-5 mt-8 w-[400px] md:w-[500px] p-3">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-4 rounded-md bg-zinc-800 "
          placeholder="Address"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="w-full p-4 rounded-md bg-zinc-800 f"
          placeholder="0.2 SOL"
        />
        <button
          onClick={transfer}
          disabled={loading}
          className="p-4 rounded-md w-full bg-[#512da8] hover:opacity-70 cursor-pointer"
        >
          {loading ? "Sending..." : "Transfer SOL"}
        </button>
      </div>
    </div>
  );
};

export default FormComp;
