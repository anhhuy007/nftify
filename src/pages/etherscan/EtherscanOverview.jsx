import React, { useState } from "react"
import { Search, Copy, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router-dom"
import EthereumIcon from "../../assets/ethereum.svg"
import TransactionIcon from "../../assets/transaction.svg"
import GasIcon from "../../assets/gas.svg"

const transactions = [
  {
    hash: "0xabcdef...xyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdef...xyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdef...xyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdef...xyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdef...xyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdef...xyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdef...xyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdef...xyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  },
  {
    hash: "0xabcdef...xyz",
    block: "21498227",
    age: "2 secs ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH",
    fee: "0.125 ETH",
    name: "Name..."
  }
]

export default function EtherscanPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [searchValue, setSearchValue] = useState(queryParams.get("search") || "")
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 100

  const handleSearch = (value) => {
    setSearchValue(value)
    const searchParams = new URLSearchParams(queryParams)
    if (value) {
      searchParams.set("search", value)
    } else {
      searchParams.delete("search")
    }
    navigate({ search: searchParams.toString() })
  }

  return (
    <div className="min-h-screen bg-[#0A0B1E]">
      <div className="container mx-auto py-6 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-white">Etherscan</h1>
          
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-[#1C1D3A] border-none text-white placeholder:text-gray-400 h-12 rounded-lg w-full"
              placeholder="Search by Transaction Hash, Address"
            />
          </div>
        </div>

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
          <h2 className="text-3xl font-bold text-white">Latest Transactions</h2>
          <Card className="bg-[#1C1D3A] border-none rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Transaction Hash</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Block</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Age</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">From</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">To</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Fee</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Item</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-[#252644]">
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-blue-500">
                          {tx.hash}
                          <button className="hover:text-blue-400">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-blue-500">{tx.block}</td>
                      <td className="p-4 text-gray-400">{tx.age}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-blue-500">
                          {tx.from}
                          <button className="hover:text-blue-400">
                            <Copy className="h-4 w-4" />
                            </button>
                        </div>
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
              >
                First
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
              <Button
                variant="secondary"
                size="icon"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
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

