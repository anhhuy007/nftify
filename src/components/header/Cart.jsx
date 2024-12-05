import React from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

function Cart() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className="flex items-center justify-center p-3 rounded-lg border-[var(--border)] transition-all transform hover:scale-105 cursor-pointer hover:bg-white hover:text-black text-white bg-white/[.2]">
            <ShoppingCart size={20} />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your ShoppingCart</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            <p>No items in your cart</p>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Cart;
