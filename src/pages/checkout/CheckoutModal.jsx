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

export default function CheckoutModal({
  preprocess,
  cancelCheckout, 
  style,
  content = "Checkout",
}) {
  const { cart, checkoutCart } = useCart();
  const [open, setOpen] = useState(false);

  // Safely calculate totals with null checks
  const subtotal = cart?.items?.reduce((acc, item) => acc + item.price, 0) || 0;
  const protocolFee = 0.1; // 0.1 ETH fixed fee
  const total = subtotal + protocolFee;

  const handleOpenChange = (isOpen) => {
    if (!isOpen && cancelCheckout) {
      cancelCheckout();
    }
    setOpen(isOpen);
  };

  const handleDialogTrigger = async () => {
    try {
      if (preprocess) {
        await preprocess();
      }
      setOpen(true);
    } catch (error) {
      toast.error(error.message || "Failed to process item");
      return;
    }
  };

  const handleCheckout = async () => {
    try {
      // Call the checkout API here
      console.log("Processing purchase...");
      const result = await NFTService.checkoutCart(cart.items);

      // If successful, log the result
      if (result) {
        const result_checkout = await checkoutCart();
        if (result_checkout) {
          toast.success("Checkout successful");
          setOpen(false);
        } else {
          toast.error("Failed to checkout");
        }
      } else {
        toast.error("Failed to checkout");
      }
    } catch (error) {
      if (error.message === "Contract not initialized") {
        toast.error("Please connect your wallet first");
      } else {
        toast.error("Failed to process purchase");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className={`w-full ${
            style || "bg-white text-black hover:bg-white/90"
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleDialogTrigger();
          }}
        >
          {content}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#0D0F1D] border-none text-white">
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
              <span>{protocolFee.toFixed(2)} ETH</span>
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
