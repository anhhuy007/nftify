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
      <Carousel className="w-full max-w-[380px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[1000px]">
        <CarouselContent className="">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="pl-6">
              <div className="p-4">
                <CollectionCard />
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

export default CollectionCarousel;
