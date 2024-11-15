import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import React from "react";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import { BigNftCard, SmallNftCard } from "@/components/NFT/NftCard";
import { useState } from "react";
import Filter from "@/pages/marketplace/nfts/components/Filter";

function NftsMarketplace() {
  const [isGrid, setIsGrid] = useState(false);

  const CardComponent = isGrid ? SmallNftCard : BigNftCard;
  const cardCount = isGrid ? 5 : 4;

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          <div className="flex w-full lg:w-auto gap-8 lg:flex-1">
            <Filter />
            <div className="flex-1">
              <SearchNfts />
            </div>
          </div>
          <div className="flex items-center justify-center w-full lg:w-auto gap-8 mt-4 lg:mt-0">
            <Sort />
            <ToggleSwitch isGrid={isGrid} setIsGrid={setIsGrid} />
          </div>
        </div>
        <div className="flex justify-between">
          {Array.from({ length: cardCount }, (_, index) => (
            <CardComponent key={index} />
          ))}
        </div>
        <div className="flex justify-between">
          {Array.from({ length: cardCount }, (_, index) => (
            <CardComponent key={index} />
          ))}
        </div>
        <div className="flex justify-between">
          {Array.from({ length: cardCount }, (_, index) => (
            <CardComponent key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default NftsMarketplace;
