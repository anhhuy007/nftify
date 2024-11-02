import React from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function Cart() {
  return (
    <>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your ShoppingCart</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <p>No items in your cart</p>
        </SheetDescription>
      </SheetContent>
    </>
  );
}

export default Cart;
