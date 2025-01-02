import React, { useEffect, useState } from "react";
import { Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import EtherscanHeader from "./EtherscanHeader";
import EthereumIcon from "../../assets/ethereum.svg";
import TransactionIcon from "../../assets/transaction.svg";
import GasIcon from "../../assets/gas.svg";
import IconFoward from "../../assets/icon_forward.svg";
import { Link } from "react-router-dom";
import { useAuthHandler } from "../../handlers/AuthHandler";
import { TRANSACTION_ENDPOINTS } from "../../handlers/Endpoints";

const TRANSACTIONS_PER_PAGE = 10;

export default function EtherscanPage() {
  // pagination and query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // page data
  const [overview, setOverview] = useState({});
  const [transactions, setTransactions] = useState([]);
  const { fetchWithAuth } = useAuthHandler();

  async function fetchEtherscanOverview() {
    try {
      const response = await fetchWithAuth(TRANSACTION_ENDPOINTS.OVERVIEW);
      setOverview(response.data);
    } catch (error) {
      console.error("Failed to fetch etherscan overview:", error);
    }
  }

  async function fetchEtherscanTransactions() {
    try {
      const response = await fetchWithAuth(TRANSACTION_ENDPOINTS.LIST, {
        method: "GET",
        params: {
          page: currentPage,
          limit: TRANSACTIONS_PER_PAGE,
        },
      });

      if (response.success) {
        setTransactions(response.data.items || []);
        const totalPage = Math.ceil(response.data.pagination.total / TRANSACTIONS_PER_PAGE);
        setTotalPages(totalPage);
      }

      console.log("Transactions:", response.data);
    } catch (error) {
      console.error("Failed to fetch etherscan transactions:", error);
    }
  }

  useEffect(() => {
    fetchEtherscanOverview();
  }, []);

  useEffect(() => {
    fetchEtherscanTransactions();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#10112c]">
      <EtherscanHeader />

      <div className="container mx-auto px-4 py-6 space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-6 bg-[#1C1D3A] border-none rounded-xl">
            <div className="flex items-center gap-6">
              <img
                src={EthereumIcon}
                alt="Ethereum Icon"
                width="30"
                height="30"
                className="ml-1"
              />
              <div>
                <div className="text-sm text-gray-400">ETHER PRICE</div>
                <div className="text-xl font-bold text-white">
                  $ {overview.totalEthersSent}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#1C1D3A] border-none rounded-xl">
            <div className="flex items-center gap-6">
              <img
                src={TransactionIcon}
                alt="Transaction Icon"
                width="40"
                height="40"
                className="ml-1"
              />
              <div>
                <div className="text-sm text-gray-400">TRANSACTIONS</div>
                <div className="text-xl font-bold text-white">
                  {overview.totalTransactions}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#1C1D3A] border-none rounded-xl">
            <div className="flex items-center gap-6">
              <img
                src={GasIcon}
                alt="Gas Icon"
                width="40"
                height="40"
                className="ml-1"
              />
              <div>
                <div className="text-sm text-gray-400">GAS PRICE</div>
                <div className="text-xl font-bold text-white">
                  {overview.totalGasPrice} GWEI
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold pb-3 text-white">
            Latest Transactions
          </h2>
          <Card className="bg-[#1C1D3A] border-none rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-5 text-base font-semibold text-gray-300 min-w-16 max-w-36">
                      Transaction Hash
                    </th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 max-w-28">
                      Block
                    </th>
                    <th className="text-left p-3 text-base font-semibold text-gray-300 min-w-16">
                      Age
                    </th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 max-w-[60px]">
                      From
                    </th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300"></th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 max-w-[60px]">
                      To
                    </th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 w-32">
                      Amount
                    </th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300 max-w-28">
                      Fee
                    </th>
                    <th className="text-left p-4 text-base font-semibold text-gray-300">
                      Item
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-[#252644]">
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-blue-500">
                          <Link
                            to={`/etherscan/transaction/${tx.transactionHash}`}
                            className="hover:text-blue-400"
                          >
                            {formatAddress(tx.transactionHash)}
                          </Link>
                          <button className="hover:text-blue-400">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-blue-500">{tx.block}</td>
                      <td className="p-3 text-gray-400">
                        {getAge(tx.createdAt)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-blue-500">
                          {formatAddress(tx.from)}
                          <button className="hover:text-blue-400">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-1 relative">
                        <img
                          src={IconFoward}
                          alt="Forward Icon"
                          width="25"
                          height="25"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-blue-500">
                          {formatAddress(tx.to)}
                          <button className="hover:text-blue-400">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-white">{tx.value} ETH</td>
                      <td className="p-4 text-white">{tx.transactionFee}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <img src={tx.stampDetails?.imgUrl} alt="Ethereum Icon" width="40" height="40" />
                          <span className="text-white max-w-40 truncate">{tx.stampDetails?.title}</span>
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
                disabled={currentPage === 1}  
              >
                First
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="secondary"
                size="icon"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-[#252644] hover:bg-[#2D2F56] text-white border-none"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getAge(date) {
  const now = new Date();
  const createdAt = new Date(date);
  const diff = now - createdAt;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}

function formatAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
