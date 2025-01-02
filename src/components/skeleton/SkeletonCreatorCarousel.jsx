import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function SkeletonCreatorCard() {
  return (
    <Card className="xl:max-w-[445px] xl:max-h-[470px] overflow-hidden">
      <CardContent className="p-4 pt-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="w-[170px] h-[168px] rounded-lg" />
            <Skeleton className="w-[170px] h-[167px] rounded-lg" />
          </div>
          <Skeleton className="flex-1 w-[250px] h-[350px] rounded-lg" />
        </div>
      </CardContent>
      <CardFooter className="rounded-b-xl">
        <Skeleton className="h-6 w-3/4 mx-auto" />
      </CardFooter>
    </Card>
  );
}

export function SkeletonCreatorCarousel() {
  return (
    <Carousel className="w-full max-w-[400px] xl:max-w-[1400px]">
      <CarouselContent className="-ml-8 xl:-ml-3">
        {[1, 2, 3].map((index) => (
          <CarouselItem key={index} className="xl:pl-2 xl:basis-1/3">
            <div className="p-4">
              <SkeletonCreatorCard />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:inline-block md:p-2" />
      <CarouselNext className="hidden md:inline-block md:p-2" />
    </Carousel>
  );
}

