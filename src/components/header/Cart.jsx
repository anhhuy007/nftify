import React, { useState } from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
  SheetFooter,
} from "@/components/ui/sheet";
import { CircleMinus, ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartProvider";
import toast from "react-hot-toast";
import CheckoutModal from "@/pages/checkout/CheckoutModal";

function Cart() {
  const { isLoading, error, cart, removeItemFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [removingItems, setRemovingItems] = useState(new Set());

  const handleRemoveItem = async (itemId) => {
    try {
      setRemovingItems((prev) => new Set([...prev, itemId]));
      await removeItemFromCart(itemId);
      toast.success("Item removed from cart");

      // Close sheet if cart becomes empty
      if (cart.items.length === 1) {
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setRemovingItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  if (isLoading) {
    return (
      <Sheet>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your ShoppingCart</SheetTitle>
          </SheetHeader>
          <SheetDescription>Loading...</SheetDescription>
        </SheetContent>
      </Sheet>
    );
  }

  if (error) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your ShoppingCart</SheetTitle>
          </SheetHeader>
          <SheetDescription>Error loading cart items</SheetDescription>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <div
        className="flex items-center justify-center p-3 rounded-lg border-[var(--border)] transition-all transform hover:scale-105 cursor-pointer hover:bg-white hover:text-black text-white bg-white/[.2]"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart size={20} />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="overflow-y-auto overflow-x-hidden flex flex-col">
          <SheetHeader>
            <SheetTitle>Your ShoppingCart</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 text-primary-foreground mt-8 flex-grow">
            {cart.items.map((item) => (
              <React.Fragment key={item._id}>
                <Link to={`/nft/${item._id}`}>
                  <div className="grid grid-cols-[18%_2%_50%_30%] items-center">
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div></div>
                    <span className="text-lg font-bold">{item.title}</span>
                    <span className="text-sm">{item.price} ETH</span>
                  </div>
                </Link>
                <Button
                  className="w-full h-12 flex items-center justify-center"
                  onClick={() => handleRemoveItem(item._id)}
                  disabled={removingItems.has(item._id)}
                >
                  {removingItems.has(item._id) ? (
                    <span>Removing...</span>
                  ) : (
                    <>
                      <CircleMinus size={20} /> Remove
                    </>
                  )}
                </Button>
                <Separator className="w-full bg-muted" />
              </React.Fragment>
            ))}
          </div>

          <SheetFooter className="mt-auto">
            <CheckoutModal />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Cart;
