import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SkeletonNftCard() {
  return (
    <div
      className={`w-[260x] h-96 p-[2px] rounded-xl transition-all duration-300 ease-in-out bg-card`}
    >
      <Card
        className={`w-full h-full p-0 bg-card transition-all duration-300 `}
      >
        <CardHeader
          className={`px-3 pt-3 pb-0 transition-all duration-300 h-[306px] `}
        >
          <Skeleton className="w-full h-full rounded-xl" />
        </CardHeader>
        <CardContent
          className={`px-3 pt-2 transition-all duration-300 h-[90px] `}
        >
          <div className="grid grid-cols-[20%_2%_50%_4%_20%] items-center mt-1">
            <Skeleton className="w-11 h-11 rounded-sm" />
            <div></div>
            <div className="flex flex-col">
              <Skeleton className="w-[150px] h-4" />
              <Skeleton className="w-[200px] h-5 mt-2" />
            </div>
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SkeletonBigNftCard() {
  return (
    <div className="w-[330px] h-[480px] p-[2px] rounded-xl bg-card animate-pulse">
      <div className="w-full h-full p-0 bg-card">
        {/* Card Header Skeleton */}
        <div className="px-3 pt-3 pb-0 h-[390px]">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        {/* Card Content Skeleton */}
        <div className="px-3 pt-2 h-[90px]">
          <div className="grid grid-cols-[20%_2%_50%_2%_20%] items-center gap-3">
            {/* Skeleton for Owner Image */}
            <Skeleton circle className="w-12 h-12" />
            <div></div>
            <div className="flex flex-col">
              {/* Skeleton for Owner */}
              <Skeleton className="w-[150px] h-4" />
              {/* Skeleton for Name */}
              <Skeleton className="w-[200px] h-5 mt-2" />
            </div>
            <div></div>
            <div className="flex-1 text-right">
              {/* Skeleton for Price */}
              {/* <Skeleton className="w-[120px] h-5" /> */}
            </div>
          </div>
          {/* Skeleton for Button */}
          {/* <Skeleton className="w-full h-10 mt-3 rounded-md" /> */}
        </div>
      </div>
    </div>
  );
}

export function SkeletonSmallNftCard() {
  return (
    <div className="w-[260px] h-[374px] p-[2px] rounded-xl bg-card animate-pulse">
      <div className="w-full h-full p-0 bg-card">
        {/* Card Header Skeleton */}
        <div className="px-3 pt-5 pb-0 h-[320px]">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        {/* Card Content Skeleton */}
        <div className="px-3 pt-2 h-[90px]">
          <div className="grid grid-cols-[75%_2%_23%] items-center justify-between gap-4">
            {/* Skeleton for Name */}
            <Skeleton className="w-[180px] h-5" />
            <div></div>
            {/* Skeleton for Price */}
            {/* <Skeleton className="w-[100px] h-5" /> */}
          </div>
          {/* Skeleton for Button */}
          {/* <Skeleton className="w-full h-10 mt-3 rounded-md" /> */}
        </div>
      </div>
    </div>
  );
}

export function SkeletonNftCarousel() {
  return (
    <Carousel className="h-full w-full max-w-[290px] md:max-w-[1000px] xl:max-w-[90vw]">
      <CarouselContent className="-ml-2 overflow-visible my-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5 relative"
          >
            <div className="relative z-10">
              <SkeletonNftCard />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:inline-block md:p-2" />
      <CarouselNext className="hidden md:inline-block md:p-2" />
    </Carousel>
  );
}
