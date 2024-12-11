import React, { useState, useEffect } from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
  SheetFooter,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = () => {
      const storedCart = localStorage.getItem("cart");
      try {
        const parsedCart = JSON.parse(storedCart) || [];
        setCart(parsedCart);
        console.log("Cart:", parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCart([]);
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, nft) => total + parseFloat(nft.price || 0), 0);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout:", cart);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className="flex items-center justify-center p-3 rounded-lg border-[var(--border)] transition-all transform hover:scale-105 cursor-pointer hover:bg-white hover:text-black text-white bg-white/[.2]">
            <ShoppingCart size={20} />
          </div>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto overflow-x-hidden flex flex-col">
          <SheetHeader>
            <SheetTitle>Your ShoppingCart</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-8 text-primary-foreground mt-8 flex-grow">
            {cart.length > 0 ? (
              cart.map(({ _id, imgUrl, title, price }) => (
                <Link to={`/nft/${_id}`} key={_id} className="group">
                  <div className="grid grid-cols-[18%_2%_60%_30%] items-center">
                    <img
                      src={imgUrl}
                      alt={title}
                      className="w-12 h-12 rounded-lg group-hover:opacity-75 transition-opacity duration-200"
                    />
                    <div></div>
                    <span className="text-lg font-bold line-clamp-1 group-hover:underline">
                      {title}
                    </span>
                    <span className="text-sm">
                      {/* {price.price.$numberDecimal} ETH */}
                    </span>
                  </div>
                  <Separator className="w-full bg-muted mt-5" />
                </Link>
              ))
            ) : (
              <p className="text-center">Your cart is empty</p>
            )}
          </div>

          <SheetFooter className="mt-auto">
            <Button className="w-full h-14" onClick={handleCheckout}>
              Checkout {calculateTotal().toFixed(2)} ETH
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Cart;
