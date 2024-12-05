import NftCarousel from "@/components/NFT/NftCarousel";
import React from "react";
import Banner from "@/pages/home/components/Banner";
import Introduction from "@/pages/home/components/Introduction";
import CollectionCarousel from "@/pages/home/components/CollectionCarousel";
import { useQuery } from "react-query";
import CreatorCarousel from "./components/CreatorCarousel";

const fetcher = (url) => fetch(url).then((res) => res.json());
const trendingApiEndpoint =
  "http://localhost:3000/api/v1/marketplace/list/trending/stamps";
const collectionsApiEndpoint =
  "http://localhost:3000/api/v1/marketplace/list/trending/collections";
const creatorsApiEndpoint =
  "http://localhost:3000/api/v1/marketplace/list/trending/creators";

function Home() {
  const {
    data: trendingData,
    error: trendingError,
    isLoading: trendingLoading,
  } = useQuery("trending-nfts", () => fetcher(trendingApiEndpoint));
  const {
    data: collectionsData,
    error: collectionsError,
    isLoading: collectionsLoading,
  } = useQuery("top-collections", () => fetcher(collectionsApiEndpoint));
  const {
    data: creatorsData,
    error: creatorsError,
    isLoading: creatorsLoading,
  } = useQuery("top-creators", () => fetcher(creatorsApiEndpoint));

  if (trendingLoading || collectionsLoading || creatorsLoading)
    return <div className="text-white">Loading...</div>;
  if (trendingError) return <div>Error: {trendingError.message}</div>;
  if (collectionsError) return <div>Error: {collectionsError.message}</div>;
  if (creatorsError) return <div>Error: {creatorsError.message}</div>;

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
          <NftCarousel data={trendingData} />
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal font-bold text-gradient">
            Top Collections
          </span>
          <CollectionCarousel data={collectionsData} />
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal font-bold text-gradient">
            Top Creators
          </span>
          <CreatorCarousel data={creatorsData} />
        </div>
        <Banner />
      </div>
    </>
  );
}

export default Home;
