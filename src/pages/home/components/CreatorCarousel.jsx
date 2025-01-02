import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryCard from "@/pages/home/components/CreatorCard";

function CreatorCarousel({ data }) {
  const creators = data.items;

  return (
    <>
      <Carousel className="w-full max-w-[400px] xl:max-w-[1400px]">
        <CarouselContent className="-ml-8 xl:-ml-3">
          {creators.map((creator) => (
            <CarouselItem key={creator._id} className="xl:pl-2 xl:basis-1/3">
              <div className="p-4">
                <CategoryCard creatorData={creator} />
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

export default CreatorCarousel;
c;
