import NftCarousel from "@/components/NFT/NftCarousel";
import React from "react";
import Banner from "@/pages/home/components/Banner";
import Introduction from "@/pages/home/components/Introduction";
import CollectionCarousel from "@/pages/home/components/CollectionCarousel";
import CategoryCarousel from "./components/CategoryCarousel";

const stamp = {
  id: 1,
  name: "Stamp",
  owner: "0x1234567890",
  price: "0.1",
  image:
    "https://i.etsystatic.com/27708971/r/il/1b55f0/2853845438/il_1588xN.2853845438_n8z5.jpg",
  owner_image:
    "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1",
};

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Introduction />
      </div>
      <div className="flex flex-col gap-32 items-center justify-center">
        <div className="flex flex-col gap-10 items-center">
          <span className="text-5xl font-bold leading-normal text-gradient">
            Trending NFTs
          </span>
          <NftCarousel />
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal font-bold text-gradient">
            Top Collections
          </span>
          <CollectionCarousel />
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal font-bold text-gradient">
            Categories
          </span>
          <CategoryCarousel />
        </div>
        <Banner />
      </div>
    </>
  );
}

export default Home;