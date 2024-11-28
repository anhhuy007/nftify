import NftCarousel from "@/components/NFT/NftCarousel";
import React from "react";
import Banner from "@/pages/home/components/Banner";
import Introduction from "@/pages/home/components/Introduction";
import CollectionCarousel from "@/pages/home/components/CollectionCarousel";
import CategoryCarousel from "./components/CategoryCarousel";
import { useQuery } from "react-query";


function Home() {
  const { data, error, isLoading } = useQuery("fetchTopTrending", async () => {
    const response = await fetch("https://api.opensea.io/api/v1/assets");
    return response.json();
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Introduction />
      </div>
      <div className="flex flex-col gap-32 items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal font-bold text-gradient">
            Trending NFTs
          </span>
          <NftCarousel tredingNFTs={data}/>
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
