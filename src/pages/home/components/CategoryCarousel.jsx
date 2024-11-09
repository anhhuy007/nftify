import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryCard from "@/pages/home/components/CategoryCard";

function CategoryCarousel() {
  return (
    <>
      <Carousel className="w-full max-w-[300px] xl:max-w-[1400px]">
        <CarouselContent className="-ml-8 xl:-ml-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="xl:pl-2 xl:basis-1/3">
              <div className="p-4">
                <CategoryCard />
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

export default CategoryCarousel;
