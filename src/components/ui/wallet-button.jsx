"use client";

import { useState } from "react";
import { ChevronDown, Copy, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/context/WalletProvider";
import toast from "react-hot-toast";

const formatAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatBalance = (balance) => {  
  return balance ? `${parseFloat(balance).toFixed(2)} ETH` : "0 ETH";
}

export function WalletButton() {
  const { isConnected, address, balance, connectWallet, disconnectWallet } =
    useWallet();

  if (!isConnected) {
    return (
      <Button
        variant="default"
        className="p-5 bg-[#1686FF] hover:bg-[#1686FF]/90"
        onClick={connectWallet}
      >
        Connect Wallet
      </Button>
    );
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy address: " + err.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#1B1B2C] border-zinc-700 hover:bg-[#1B1B2C]/80 hover:border-zinc-600"
        >
          <Wallet className="mr-2 h-4 w-4 text-[#1686FF]" />
          <span className="text-zinc-400 mr-2">{formatAddress(address)}</span>
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-[#1B1B2C] border-zinc-700"
        align="end"
      >
        <DropdownMenuLabel className="text-zinc-400">
          Wallet Balance
        </DropdownMenuLabel>
        <DropdownMenuItem className="text-white font-medium">
          {formatBalance(balance)}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-700" />
        <DropdownMenuItem className="flex items-center justify-between text-zinc-400">
          <span className="truncate">{address}</span>
          <button
            onClick={copyAddress}
            className="p-1 hover:bg-zinc-700 rounded-md transition-colors"
          >
            <Copy className="h-4 w-4" />
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-700" />
        <DropdownMenuItem
          className="text-red-500 cursor-pointer"
          onClick={disconnectWallet}
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
