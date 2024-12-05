import React from "react";
import CollectionCard from "@/pages/home/components/CollectionCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function CollectionCarousel({ data }) {
  const collections = data.items;

  return (
    <>
      <Carousel className="w-full max-w-[380px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[1000px]">
        <CarouselContent className="">
          {collections.map((collection) => (
            <CarouselItem key={collection.name} className="pl-6">
              <div className="p-4">
                <CollectionCard collection={collection} />
              </div>
            </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-block md:p-2" />
        <CarouselNext className="hidden md:inline-block md:p-2" />
      </Carousel>
    </>
  );
}

export default CollectionCarousel;
