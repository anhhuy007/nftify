"use client";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NftGeneralInformation from "@/pages/nft/components/NftGeneralInformation";
import NftDetailTabs from "@/pages/nft/components/NftDetailTabs";
import NftCarousel from "@/components/NFT/NftCarousel";

export default function NftDetail() {
  const { nftId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageUrl =
    "https://th.bing.com/th/id/OIP.GubYybcE-2aUiHUBmhl53wHaI-?w=164&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7";

  return (
    <div className="w-full flex flex-col my-20 p-0 md:px-32 items-center justify-center gap-32">
      <div className="w-full flex-1 flex flex-col justify-center md:flex-row gap-16 md:gap-10 xl:gap-28">
        <div className="flex flex-col">
          <div className="relative">
            <img
              src={imageUrl}
              alt="NFT Image"
              className="w-full mx-auto md:mx-0 h-auto max-w-xs md:max-w-[600px] xl:max-w-[700px] aspect-square border-2 border-primary rounded-xl"
            />
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-primary hover:text-primary-foreground text-white rounded-full p-1"
                  aria-label="View full image"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-2">
                <img
                  src={imageUrl}
                  alt="Full size NFT"
                  className="w-full h-full"
                />
              </DialogContent>
            </Dialog>
          </div>
          <NftDetailTabs />
        </div>
        <NftGeneralInformation />
      </div>
      <NftCarousel />
    </div>
  );
}
