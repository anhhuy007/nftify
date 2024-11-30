import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NftCard from "@/components/NFT/NftCard";

const stampData = {
  id: 1,
  name: "Stamp",
  owner: "0x1234567890",
  price: "0.1",
  image:
    "https://i.etsystatic.com/27708971/r/il/1b55f0/2853845438/il_1588xN.2853845438_n8z5.jpg",
  owner_image:
    "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1",
};

function NftCarousel() {
  return (
    <Carousel className="h-full w-full max-w-[290px] md:max-w-[1000px] xl:max-w-[1500px]">
      <CarouselContent className="-ml-2 overflow-visible my-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5 relative"
          >
            <div className="relative z-10">
              <NftCard stamp={stampData} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:inline-block md:p-2" />
      <CarouselNext className="hidden md:inline-block md:p-2" />
    </Carousel>
  );
}

export default NftCarousel;
