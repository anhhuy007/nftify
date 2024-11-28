import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NftCard from "@/components/NFT/NftCard";

function NftCarousel({ tredingNFTs}) {
  return (
    <>
      <Carousel className="w-full max-w-[290px] md:max-w-[1000px] xl:max-w-[1500px]">
        <CarouselContent className="-ml-2">
          { tredingNFTs.map((nft, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5"
            >
              <div className="">
                <NftCard item={nft} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-block md:p-2" />
        <CarouselNext className="hidden md:inline-block md:p-2" />
      </Carousel>
    </>
  );
}

export default NftCarousel;
