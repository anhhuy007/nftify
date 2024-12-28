import React, { useState } from "react"
import { Copy, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLocation } from "react-router-dom"
import EtherscanHeader from "./EtherscanHeader"
import EthereumIcon from "../../assets/ethereum.svg"
import TransactionIcon from "../../assets/transaction.svg"
import GasIcon from "../../assets/gas.svg"
import IconFoward from "../../assets/icon_forward.svg"

const transactions = [
  {
    hash: "0xabcdefgh...qrstuvxyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdefgh...qrstuvxyz",
    to: "0xabcdefgh...qrstuvxyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdefgh...qrstuvxyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdefgh...qrstuvxyz",
    to: "0xabcdefgh...qrstuvxyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdefgh...qrstuvxyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdefgh...qrstuvxyz",
    to: "0xabcdefgh...qrstuvxyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdefgh...qrstuvxyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdefgh...qrstuvxyz",
    to: "0xabcdefgh...qrstuvxyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdefgh...qrstuvxyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdefgh...qrstuvxyz",
    to: "0xabcdefgh...qrstuvxyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdefgh...qrstuvxyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdefgh...qrstuvxyz",
    to: "0xabcdefgh...qrstuvxyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdefgh...qrstuvxyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdefgh...qrstuvxyz",
    to: "0xabcdefgh...qrstuvxyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdefgh...qrstuvxyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdefgh...qrstuvxyz",
    to: "0xabcdefgh...qrstuvxyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdefgh...qrstuvxyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdefgh...qrstuvxyz",
    to: "0xabcdefgh...qrstuvxyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  }
]

export default function EtherscanPage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 100

  return (
    <div className="min-h-screen bg-[#10112c]">
      <EtherscanHeader />

      <div className="container mx-auto py-6 space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-6 bg-[#1C1D3A] border-none rounded-xl">
            <div className="flex items-center gap-6">
              <img src={EthereumIcon} alt="Ethereum Icon" width="30" height="30" className="ml-1" />
              <div>
                <div className="text-sm text-gray-400">ETHER PRICE</div>
                <div className="text-xl font-bold text-white">$3,900.61</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#1C1D3A] border-none rounded-xl">
            <div className="flex items-center gap-6">
              <img src={TransactionIcon} alt="Transaction Icon" width="40" height="40" className="ml-1" />
              <div>
                <div className="text-sm text-gray-400">TRANSACTIONS</div>
                <div className="text-xl font-bold text-white">2,512 K</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#1C1D3A] border-none rounded-xl">
            <div className="flex items-center gap-6">
              <img src={GasIcon} alt="Gas Icon" width="40" height="40" className="ml-1" />
              <div>
                <div className="text-sm text-gray-400">GAS PRICE</div>
                <div className="text-xl font-bold text-white">12.487 Gwei</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold pb-3 text-white">Latest Transactions</h2>
          <Card className="bg-[#1C1D3A] border-none rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-5 text-base font-semibold text-gray-300 w-32">Transaction Hash</th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 w-28">Block</th>
                    <th className="text-left p-3 text-base font-semibold text-gray-300 w-28">Age</th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 w-64">From</th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300"></th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 w-60">To</th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 w-32">Amount</th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 w-32">Fee</th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300">Item</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-[#252644]">
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-blue-500">
                          {tx.hash}
                          <button className="hover:text-blue-400">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-blue-500">{tx.block}</td>
                      <td className="p-3 text-gray-400">{tx.age}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-blue-500">
                          {tx.from}
                          <button className="hover:text-blue-400">
                            <Copy className="h-4 w-4" />
                            </button>
                        </div>
                      </td>
                      <td className="p-1 relative"> 
                        <img src={IconFoward} alt="Forward Icon" width="25" height="25" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-blue-500">
                          {tx.to}
                          <button className="hover:text-blue-400">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-white">{tx.amount}</td>
                      <td className="p-4 text-white">{tx.fee}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-600 rounded"></div>
                          <span className="text-white">{tx.name}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-700 flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
                onClick={() => setCurrentPage(1)}
              >
                First
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
              <Button
                variant="secondary"
                size="icon"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
                onClick={() => setCurrentPage(totalPages)}
              >
                Last
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

