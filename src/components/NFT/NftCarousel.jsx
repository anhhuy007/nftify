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
      <Carousel className="w-full max-w-[290px] xl:max-w-[1500px]">
        <CarouselContent className="-ml-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="xl:basis-1/5">
              <div className="">
                <NftCard />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="" />
        <CarouselNext />
      </Carousel>
    </>
  );
}

export default NftCarousel;
