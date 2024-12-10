import React from "react";
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

const nfts = [
  {
    id: 1,
    title: "NFT Title",
    imgUrl:
      "https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.2x.rsocial.w600.jpg",
    price: "0.01",
  },
  {
    id: 2,
    title: "NFT Title",
    imgUrl:
      "https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.2x.rsocial.w600.jpg",
    price: "0.01",
  },
  {
    id: 3,
    title: "NFT Title",
    imgUrl:
      "https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.2x.rsocial.w600.jpg",
    price: "0.01",
  },
];

function Cart() {
  const calculateTotal = () => {
    let total = 0;
    nfts.forEach((nft) => {
      total += parseFloat(nft.price);
    });
    return total;
  };

  const handleCheckout = () => {
    // Call the checkout API here
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

          <div className="flex flex-col gap-4 text-primary-foreground mt-8 flex-grow">
            {nfts.map((nft) => (
              <React.Fragment key={nft.id}>
                <Link to={`/nft/${nft.id}`}>
                  <div className="grid grid-cols-[18%_2%_60%_30%] items-center">
                    <img
                      src={nft.imgUrl}
                      alt={nft.title}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div></div>
                    <span className="text-lg font-bold">{nft.title}</span>
                    <span className="text-sm">{nft.price} ETH</span>
                  </div>
                </Link>
                <Separator className="w-full bg-muted" />
              </React.Fragment>
            ))}
          </div>

          <SheetFooter className="mt-auto">
            <Button className="w-full h-14" onClick={handleCheckout}>
              Checkout {calculateTotal()} ETH
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Cart;
