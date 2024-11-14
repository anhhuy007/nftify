import NftCarousel from "@/components/NFT/NftCarousel";
import React from "react";
import Banner from "@/pages/home/components/Banner";
import Introduction from "@/pages/home/components/Introduction";
import CollectionCarousel from "@/pages/home/components/CollectionCarousel";
import CategoryCarousel from "./components/CategoryCarousel";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Introduction />
      </div>
      <div className="flex flex-col gap-32 items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
            Trending NFTs
          </span>
          <NftCarousel />
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
            Top Collections
          </span>
          <CollectionCarousel />
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
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
