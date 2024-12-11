import NftCarousel from "@/components/NFT/NftCarousel";
import React from "react";
import Banner from "@/pages/home/components/Banner";
import Introduction from "@/pages/home/components/Introduction";
import CollectionCarousel from "@/pages/home/components/CollectionCarousel";
import { useQuery } from "react-query";
import CreatorCarousel from "./components/CreatorCarousel";
import LoadingAnimation from "@/components/ui/loading";
import {
  trendingNftsApiEndpoint,
  trendingCollectionsApiEndpoint,
  trendingCreatorsApiEndpoint,
  fetcher,
} from "@/utils/endpoints";
import ErrorAnimation from "@/components/ui/error";
import { Toaster } from "react-hot-toast";
import { SkeletonNftCarousel } from "@/components/skeleton/SkeletonNft";

function Home() {
  const {
    data: trendingData,
    error: trendingError,
    isLoading: trendingLoading,
  } = useQuery("trending-nfts", () => fetcher(trendingNftsApiEndpoint));
  const {
    data: collectionsData,
    error: collectionsError,
    isLoading: collectionsLoading,
  } = useQuery("top-collections", () =>
    fetcher(trendingCollectionsApiEndpoint)
  );
  const {
    data: creatorsData,
    error: creatorsError,
    isLoading: creatorsLoading,
  } = useQuery("top-creators", () => fetcher(trendingCreatorsApiEndpoint));

  if (trendingLoading || collectionsLoading || creatorsLoading)
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
            <SkeletonNftCarousel />
          </div>
          <div className="flex flex-col justify-center items-center gap-10">
            <span className="text-5xl leading-normal font-bold text-gradient">
              Top Collections
            </span>
            {/* Skeleton for collections here */}
          </div>
          <div className="flex flex-col justify-center items-center gap-10">
            <span className="text-5xl leading-normal font-bold text-gradient">
              Top Creators
            </span>
            {/* Skeleton for creators here */}
          </div>
          <Banner />
        </div>
      </>
    );
  if (trendingError || collectionsError || creatorsError)
    return ErrorAnimation();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center">
        <Introduction />
      </div>
      <div className="flex flex-col gap-32 items-center justify-center">
        <div className="flex flex-col gap-10 items-center">
          <span className="text-5xl font-bold leading-normal text-gradient">
            Trending NFTs
          </span>
          <NftCarousel data={trendingData} isLoading={trendingLoading} />
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
          <CreatorCarousel data={creatorsData} isLoading={trendingLoading} />
        </div>
        <Banner />
      </div>
    </>
  );
}

export default Home;
