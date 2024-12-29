import React from "react";
import { Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EtherscanHeader from "./EtherscanHeader";
import { useParams } from "react-router-dom";
import { useAuthHandler } from "../../handlers/AuthHandler";
import { useQuery } from "react-query";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import EthereumIcon from "../../assets/ethereum.svg";
import { TRANSACTION_ENDPOINTS } from "../../handlers/Endpoints";

export default function TransactionDetailPage() {
  const { hash } = useParams();
  const { fetchWithAuth } = useAuthHandler();
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const {
    data: transactionData,
    isLoading,
    error,
  } = useQuery(
    ["transaction", hash],
    () => fetchWithAuth(`${TRANSACTION_ENDPOINTS.FIND}/${hash}`),
    {
      enabled: !!hash,
      retry: 1,
      onError: (error) => {
        console.error("Failed to fetch transaction:", error);
      },
    }
  );

  if (isLoading) return <LoadingAnimation />;
  if (error) return <ErrorAnimation />;
  if (!transactionData?.data) return null;

  const tx = transactionData.data;

  return (
    <div className="min-h-screen bg-[#10112c]">
      <EtherscanHeader />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-white">Transaction Details</h1>

        <Card className="bg-[#1C1D3A] border-none rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-700">
            {/* Transaction Information */}
            <div className="p-6 pl-8 space-y-3">
              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">
                  Transaction Hash:
                </div>
                <div className="flex items-center gap-2 text-lg text-white">
                  {tx.transactionHash}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-blue-400"
                    onClick={() => handleCopy(tx.transactionHash)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">Block:</div>
                <div className="text-lg text-white">{tx.block}</div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">
                  Timestamp:
                </div>
                <div className="text-lg text-white">{tx.createdAt}</div>
              </div>
            </div>

            {/* From/To Information */}
            <div className="p-6 pl-8 space-y-3">
              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">From:</div>
                <div className="flex items-center gap-2 text-lg text-white">
                  {tx.from}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-blue-400"
                    onClick={() => handleCopy(tx.from)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">
                  Interacted With (To):
                </div>
                <div className="flex items-center gap-2 text-lg text-white">
                  {tx.to}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-blue-400"
                    onClick={() => handleCopy(tx.to)}
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
                <div className="flex items-center gap-2 text-lg text-white">
                  <span>{tx.value} </span>
                  <img
                    src={EthereumIcon}
                    alt="Ethereum Icon"
                    width="14"
                    height="14"
                  />
                </div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">
                  Transaction Fee:
                </div>
                <div className="flex items-center gap-2 text-lg text-white">
                  <span>{tx.transactionFee} </span>
                  <img
                    src={EthereumIcon}
                    alt="Ethereum Icon"
                    width="14"
                    height="14"
                  />
                </div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-32 items-center">
                <div className="text-lg font-medium text-gray-400">
                  Gas Fee:
                </div>
                <div className="flex items-center gap-2 text-lg text-white">
                  <span>{tx.gasPrice} </span>
                  <img
                    src={EthereumIcon}
                    alt="Ethereum Icon"
                    width="14"
                    height="14"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
