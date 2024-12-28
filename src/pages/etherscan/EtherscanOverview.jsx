'use client'

import React, { useState, useEffect } from "react"
import { Search } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLocation, useNavigate } from "react-router-dom"

const transactions = [
  {
    hash: "0xabcxyz...",
    timeAgo: "2 min ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz", 
    amount: "0.125 ETH"
  },
  {
    hash: "0xabcxyz...",
    timeAgo: "2 min ago", 
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH"
  },
  {
    hash: "0xabcxyz...",
    timeAgo: "2 min ago",
    from: "0xabcdef...xyz", 
    to: "0xabcdef...xyz",
    amount: "0.125 ETH"
  },
  {
    hash: "0xabcxyz...",
    timeAgo: "2 min ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH"
  },
  {
    hash: "0xabcxyz...",
    timeAgo: "2 min ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH"
  },
  {
    hash: "0xabcxyz...",
    timeAgo: "2 min ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH"
  },
  {
    hash: "0xabcxyz...",
    timeAgo: "2 min ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH"
  },
  {
    hash: "0xabcxyz...",
    timeAgo: "2 min ago",
    from: "0xabcdef...xyz",
    to: "0xabcdef...xyz",
    amount: "0.125 ETH"
  }
]

export default function EtherscanPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [searchValue, setSearchValue] = useState(queryParams.get("search") || "")

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
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-[#1C1D3A] border-none text-white placeholder:text-gray-400 h-12 rounded-lg"
              placeholder="Search by Transaction Hash, Address"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 space-y-1 bg-[#1C1D3A] border-none text-white">
            <div className="text-sm text-gray-400">ETHER PRICE</div>
            <div className="text-xl font-bold">$3,900.61</div>
          </Card>

          <Card className="p-4 space-y-1 bg-[#1C1D3A] border-none text-white">
            <div className="text-sm text-gray-400">TRANSACTIONS</div>
            <div className="text-xl font-bold">2,512 K</div>
          </Card>

          <Card className="p-4 space-y-1 bg-[#1C1D3A] border-none text-white">
            <div className="text-sm text-gray-400">GAS PRICE</div>
            <div className="text-xl font-bold">12.487 Gwei</div>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Latest Transactions</h2>
          <Card className="bg-[#1C1D3A] border-none">
            <div className="divide-y divide-gray-700">
              {transactions.map((tx, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-[#252644] text-white">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-500/10 rounded">
                      <svg
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">{tx.hash}</div>
                      <div className="text-sm text-gray-400">{tx.timeAgo}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>
                      From <span className="font-medium">{tx.from}</span>
                    </div>
                    <div>
                      To <span className="font-medium">{tx.to}</span>
                    </div>
                  </div>
                  <div className="font-medium">{tx.amount}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

