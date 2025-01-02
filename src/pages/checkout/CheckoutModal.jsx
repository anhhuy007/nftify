import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import NFTService from "@/services/NFTService";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartProvider";
import { ethers } from "ethers";
import { useAuthHandler } from "../../handlers/AuthHandler";
import { TRANSACTION_ENDPOINTS } from "../../handlers/Endpoints";

// Constants
const PROTOCOL_FEE = 0.1; // 0.1 ETH fixed fee

function calculateSubtotal(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((acc, item) => acc + (item?.price || 0), 0);
}

function processTransaction(transactionData) {
  const { event, transaction: _transaction } = transactionData;
  if (!event || !_transaction) return null;

  try {
    const gasUsed = BigInt(_transaction.gasUsed);
    const gasPrice = BigInt(_transaction.gasPrice);
    const transactionFee = ethers.formatEther((gasUsed * gasPrice).toString());

    return {
      transactionHash: _transaction.blockHash,
      block: _transaction.blockNumber,
      from: event.args[1],
      to: event.args[2],
      tokenID: Number(event.args[0]),
      value: ethers.formatEther(event.args[3].toString()),
      transactionFee,
      gasPrice: ethers.formatEther(gasPrice.toString()),
    };
  } catch (error) {
    console.error("Failed to process transaction:", error);
    return null;
  }
}

export default function CheckoutModal({
  preprocess,
  cancelCheckout,
  style,
  content = "Checkout",
}) {
  const { cart, checkoutCart } = useCart();
  const [open, setOpen] = useState(false);
  const { fetchWithAuth } = useAuthHandler();

  const subtotal = calculateSubtotal(cart?.items);
  const total = subtotal + PROTOCOL_FEE;

  function handleOpenChange(isOpen) {
    if (!isOpen && cancelCheckout) {
      cancelCheckout();
    }
    setOpen(isOpen);
  }

  async function saveTransaction(transaction) {
    try {
      const response = await fetchWithAuth(TRANSACTION_ENDPOINTS.BASE, {
        method: "POST",
        body: JSON.stringify(transaction),
      });

      if (!response.success) {
        throw new Error("Failed to save transaction");
      }

      return response.data;
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
  }

  async function handleDialogTrigger(event) {
    event.preventDefault();
    try {
      if (preprocess) {
        await preprocess();
      }
      setOpen(true);
    } catch (error) {
      toast.error(error.message || "Failed to process item");
    }
  }

  async function handleCheckout() {
    if (!cart?.items?.length) {
      toast.error("Cart is empty");
      return;
    }

    if (!NFTService.contract) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      console.log("Processing purchase...");
      const transaction_result = await NFTService.checkoutCart(cart.items);

      if (!transaction_result?.results) {
        throw new Error("Invalid transaction result");
      }

      const processedTransactions = transaction_result.results
        .map(processTransaction)
        .filter(Boolean);

      if (processedTransactions.length === 0) {
        throw new Error("No transactions were processed successfully");
      }

      // save transactions to database
      for (const _trans of processedTransactions) {
        const response = await saveTransaction(_trans);
        console.log("Transaction saved:", response);
      }

      const checkout_response = await checkoutCart();
      if (checkout_response) {
        toast.success("Checkout successful");
        setOpen(false);
      } else {
        throw new Error("Failed to checkout");
      }
    } catch (error) {
      const errorMessage = error.message === "Contract not initialized"
        ? "Please connect your wallet first"
        : "Failed to process purchase";
      toast.error(errorMessage);
      console.error("Checkout error:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className={`w-full ${style || "bg-white text-black hover:bg-white/90"}`}
          onClick={handleDialogTrigger}
        >
          {content}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#0D0F1D] border-none text-white">
        {/* Rest of the JSX remains unchanged */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Check out
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {cart?.items?.map((item) => (
            <div key={item?._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item?.imgUrl}
                  alt={item?.title}
                  className="h-10 w-10 rounded-md object-cover"
                />
                <p className="text-sm font-medium">{item?.title}</p>
              </div>
              <p className="text-sm font-medium">{item?.price} ETH</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <img
                src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png"
                alt="Ethereum"
                className="h-6 w-6"
              />
              <span>Ethereum</span>
            </div>
            {NFTService.contract ? (
              <span className="text-green-500">Connected</span>
            ) : (
              <span className="text-red-500">Not connected</span>
            )}
          </div>

          <Separator className="my-4 bg-white/20" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Price</span>
              <span>{subtotal.toFixed(2)} ETH</span>
            </div>
            <div className="flex justify-between">
              <span>Protocol fee</span>
              <span>{PROTOCOL_FEE.toFixed(2)} ETH</span>
            </div>
            <Separator className="my-2 bg-white/20" />
            <div className="flex justify-between font-medium">
              <span>You will pay</span>
              <span>{total.toFixed(2)} ETH</span>
            </div>
          </div>

          <Button
            className="mt-6 w-full bg-white text-black hover:bg-white/90"
            onClick={handleCheckout}
          >
            Purchase
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}