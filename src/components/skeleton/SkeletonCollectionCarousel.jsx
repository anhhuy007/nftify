import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

function SkeletonCollectionCard() {
  return (
    <Card className="w-full overflow-hidden text-white rounded-3xl bg-card">
      <CardContent className="p-0">
        <div className="flex items-center justify-between flex-col-reverse gap-5 md:flex-row md:gap-20 p-6">
          <div className="space-y-5 md:max-w-[60%]">
            <Skeleton className="h-8 w-96" />
            <Skeleton className="h-16 w-full" />
            <div className="space-y-3">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-12 w-24" />
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 max-w-[200px] md:max-w-[300px]">
            <Skeleton className="w-full aspect-square rounded-xl" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SkeletonCollectionCarousel() {
  return (
    <Carousel className="w-full max-w-[380px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[1000px]">
      <CarouselContent>
        {[1, 2, 3].map((index) => (
          <CarouselItem key={index} className="pl-6">
            <div className="p-4">
              <SkeletonCollectionCard />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:inline-block md:p-2" />
      <CarouselNext className="hidden md:inline-block md:p-2" />
    </Carousel>
  );
}

