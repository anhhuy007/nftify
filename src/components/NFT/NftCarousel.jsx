import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NftCard from "@/components/NFT/NftCard";
import SkeletonNftCard from "@/components/skeleton/SkeletonNft";

function NftCarousel({ data, isLoading }) {
  const stamps = data?.items || [];

  return (
    <Carousel className="h-full w-full max-w-[290px] md:max-w-[1000px] xl:max-w-[90vw]">
      <CarouselContent className="-ml-2 overflow-visible my-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5 relative"
              >
                <div className="relative z-10">
                  <SkeletonNftCard />
                </div>
              </CarouselItem>
            ))
          : stamps.map((stamp) => (
              <CarouselItem
                key={stamp.id}
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
