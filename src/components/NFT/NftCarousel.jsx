import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NftCard from "@/components/NFT/NftCard";

function NftCarousel() {
  return (
    <>
      <Carousel className="w-full xl:max-w-[1500px] lg:max-w-[1200px] md:max-w-[900px] max-w-[600px] ">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="lg:basis-1/4 sm:basis-1/3 xl:basis-1/5 pl-1"
            >
              <div className="p-4">
                <NftCard />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}

export default NftCarousel;
