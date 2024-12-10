import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NftCard from "@/components/NFT/NftCard";

function NftCarousel({ data }) {
  const stamps = data?.items || [];

  if (stamps.length === 0) {
    return <div className="text-center text-xl">No NFTs found.</div>;
  }

  return (
    <Carousel className="h-full w-full max-w-[290px] md:max-w-[1000px] xl:max-w-[90vw]">
      <CarouselContent className="-ml-2 overflow-visible my-4">
        {stamps.map((stamp, index) => (
          <CarouselItem
            key={stamp.id || index}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5 relative"
          >
            <div className="relative z-10">
              <NftCard stamp={stamp} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:inline-block md:p-2" />
      <CarouselNext className="hidden md:inline-block md:p-2" />
    </Carousel>
  );
}

export default NftCarousel;
