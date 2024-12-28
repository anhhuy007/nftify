import React from "react"
import { Copy } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EtherscanHeader from "./EtherscanHeader"

const transactionData = {
  hash: "0xbfa600b22a4b844e7c12b8512819940b9a0d78830b28020d9a3a21aa94ff3e1",
  block: "21498227",
  timestamp: "45 mins ago (Dec-13-2024 02:53:47 AM UTC)",
  from: "0x000000633b68f5D8D3a86593ebB815b46638CBe0",
  to: "0x68d30f47F19c07bCCEf4Ac7FAE2Dc12FCa3e0dC9",
  value: "0.053 ($210.88)",
  transactionFee: "0.00025284131616154 ETH ($0.99)",
  gasFee: "12.04 Gwei (0.000000012040062674 ETH)"
}

export default function TransactionDetailPage() {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-[#10112c]">
      <EtherscanHeader />

      <div className="container mx-auto py-8 space-y-8">
        <h1 className="text-3xl font-bold text-white">Transaction Details</h1>

        <Card className="bg-[#1C1D3A] border-none rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-700">
            {/* Transaction Information */}
            <div className="p-6 pl-8 space-y-3">
              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">Transaction Hash:</div>
                <div className="flex items-center gap-2 text-lg text-white">
                  {transactionData.hash}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:text-blue-400"
                    onClick={() => handleCopy(transactionData.hash)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">Block:</div>
                <div className="text-lg text-white">{transactionData.block}</div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">Timestamp:</div>
                <div className="text-lg text-white">{transactionData.timestamp}</div>
              </div>
            </div>

            {/* From/To Information */}
            <div className="p-6 pl-8 space-y-3">
              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">From:</div>
                <div className="flex items-center gap-2 text-lg text-white">
                  {transactionData.from}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:text-blue-400"
                    onClick={() => handleCopy(transactionData.from)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">Interacted With (To):</div>
                <div className="flex items-center gap-2 text-lg text-white">
                  {transactionData.to}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:text-blue-400"
                    onClick={() => handleCopy(transactionData.to)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Value Information */}
            <div className="p-6 pl-8 space-y-3">
              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">Value:</div>
                <div className="text-lg text-white">{transactionData.value}</div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">Transaction Fee:</div>
                <div className="text-lg text-white">{transactionData.transactionFee}</div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">Gas Fee:</div>
                <div className="text-lg text-white">{transactionData.gasFee}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

