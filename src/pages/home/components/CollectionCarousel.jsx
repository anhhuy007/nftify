import React from "react";
import CollectionCard from "@/pages/home/components/CollectionCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function CollectionCarousel() {
  return (
    <>
      <Carousel className="w-full max-w-[300px] xl:max-w-[800px]">
        <CarouselContent className="">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="pl-6">
              <div className="p-4">
                <CollectionCard />
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

export default CollectionCarousel;
